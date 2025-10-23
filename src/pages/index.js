/** @jsxImportSource @emotion/react */
import Head from 'next/head'
import { css } from '@emotion/react'
import { useAuthState } from 'react-firebase-hooks/auth'

import firebase, { auth } from '../lib/firebase'
import { setUser, userWithIDExists, getUserByCustomDomain, normalizeCustomDomain } from '../lib/db'

import meta from '../components/meta'
import Spinner from '../components/spinner'
import Container from '../components/container'
import PeepWalk from '../components/PeepWalk'
import Button from '../components/button'
import CTAButton from '../components/cta-button'
import CTAButtonDashboard from '../components/cta-button-dashboard'
import CTAButtonSignOut from '../components/cta-button-signout'
import ProfileView from '../components/profile-view'

const dicebearStyles = [
  'notionists-neutral',
  'notionists',
  'lorelei-neutral',
  'lorelei',
  'dylan',
]

function generateDiceBearAvatar(uid) {
  const hash = uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const style = dicebearStyles[hash % dicebearStyles.length]
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${uid}`
}

export default function Home({ customDomainUser }) {
  const [user, loading, error] = useAuthState(auth)

  if (customDomainUser) {
    return <ProfileView user={customDomainUser} />
  }

  if (error) {
    return (
      <>
        <p>Oop, we&apos;ve had an error:</p>
        <pre>{JSON.stringify(error)}</pre>
      </>
    )
  }

  return (
    <div>
      <div
        css={css`
          margin-top: 0rem;
          margin-bottom: 1.5rem;
          font-size: 4.5rem;
          font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", emoji, sans-serif;
          -webkit-font-feature-settings: "liga" off, "calt" off;
          font-feature-settings: "liga" off, "calt" off;

          @media (max-width: 720px) {
            margin-bottom: 1.5rem;
          }
        `}
      >
        🍱
      </div>
      <h1
        css={css`
          font-size: 1.25rem;
          letter-spacing: -0.02rem;
          margin-bottom: 1.5rem;
        `}
      >
        An open-source, distraction-free spot for anyone to write anything!
      </h1>
      <ul
        css={css`
          list-style: none;
          color: var(--grey-3);
          margin-bottom: 2.3rem;

          li {
            margin: 0.75rem 0;
          }

          li::before {
            display: inline-block;
            content: '';
            font-size: 0.9rem;
            margin-right: 0.5rem;
          }
        `}
      >
        No Ads, Paywalls, & It's Open-Source!
      </ul>
      {loading ? (
          <Spinner />
      ) : user ? (
        <div
          css={css`
            display: inline-flex;
            flex-direction: column;
            gap: 0.2rem;
          `}
        >
          <CTAButtonDashboard
            onClick={(e) => {
              if (e.target.closest('.arrow')) {
                window.location.href = '/dashboard'
              }
            }}
          />
          <CTAButtonSignOut
            onClick={(e) => {
              if (e.target.closest('.arrow')) {
                auth.signOut()
              }
            }}
          />
        </div>
      ) : (
        <CTAButton
          onClick={(e) => {
            // Check if click was on the arrow element
            if (e.target.closest('.arrow')) {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
              auth.signInWithPopup(googleAuthProvider).then(async cred => {
                let userExists = await userWithIDExists(cred.user.uid)
                if (!userExists) {
                  await setUser(cred.user.uid, {
                    name: cred.user.uid,
                    displayName: cred.user.displayName || 'Anonymous',
                    about: 'Nothing to say about you.',
                    posts: [],
                    photo: generateDiceBearAvatar(cred.user.uid),
                    readingList: [],
                  })
                }
              })
            }
          }}
        >
          Sign Up
        </CTAButton>
      )}
      <div
        css={css`
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
        `}
      >
        <PeepWalk height="450px" width="100%" />
      </div>
    </div>
  )
}

Home.getLayout = function HomeLayout(page) {
  if (page?.props?.customDomainUser) {
    return page
  }

  return (
    <Container maxWidth="420px">
      <Head>
        {meta({
          title: 'Bublr - A Minimal Writing Community',
          description:
            'Bublr is an open-source, ultra-minimal community for writers to share their thoughts, stories, and ideas without ads or paywalls.',
          url: '/',
          image: '/images/socials.png',
        })}
        <link rel="canonical" href="https://bublr.life/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://bublr.life/",
            "name": "Bublr",
            "description": "An open-source, ultra-minimal community for anyone, to write anything",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://bublr.life/{search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }} />
      </Head>
      {page}
    </Container>
  )
}

export async function getServerSideProps({ req }) {
  const host = req?.headers?.host || ''
  const normalizedHost = normalizeCustomDomain(host)
  const defaultHosts = (process.env.NEXT_PUBLIC_APP_HOSTS || 'localhost:3000,bublr.life')
    .split(',')
    .map(h => h.trim().toLowerCase())
    .filter(Boolean)

  if (normalizedHost && !defaultHosts.includes(normalizedHost)) {
    try {
      const user = await getUserByCustomDomain(normalizedHost)
      const processedPosts = user.posts
        .filter(p => p.published)
        .map(p => ({
          ...p,
          lastEdited: p.lastEdited?.toDate?.()
            ? p.lastEdited.toDate().getTime()
            : p.lastEdited?.toMillis?.() || Date.now(),
        }))
        .sort((a, b) => b.lastEdited - a.lastEdited)
        .slice(0, 20)

      user.posts = processedPosts

      return {
        props: {
          customDomainUser: user,
        },
      }
    } catch (error) {
      console.log(error)
      return { notFound: true }
    }
  }

  return {
    props: {
      customDomainUser: null,
    },
  }
}