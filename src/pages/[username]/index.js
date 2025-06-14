/** @jsxImportSource @emotion/react */
import Link from 'next/link'
import Head from 'next/head'
import { css } from '@emotion/react'
import { htmlToText } from 'html-to-text'

import { truncate } from '../../lib/utils'
import { getUserByName } from '../../lib/db'

import meta from '../../components/meta'
import Container from '../../components/container'

export default function Profile({ user }) {
  return (
    <Container maxWidth="640px">
      <Head>
        {meta({
          title: `${user.displayName} (@${user.name}) | Bublr`,
          description: user.about || `Check out ${user.displayName}'s writing on Bublr, an open-source community for writers.`,
          url: `/${user.name}`,
          image: user.photo,
          keywords: `${user.displayName}, ${user.name}, writer, author, blog, writing`
        })}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href={`https://bublr.life/${user.name}`} />
      </Head>

      <img
        src={user.photo}
        alt={`${user.displayName}'s profile picture`}
        width="80"
        height="80"
        loading="eager"
        css={css`
          width: 5rem;
          height: 5rem;
          border-radius: 2.5rem;
          object-fit: cover;
        `}
      />
      <h1
        css={css`
          font-size: 1.5rem;
          letter-spacing: -0.03em;
          margin: 1.5rem 0 1rem 0;
        `}
      >
        {user.displayName}
      </h1>

      <p
        css={css`
          color: var(--grey-4);
          font-size: 1.125rem;
          font-family: 'Newsreader', serif;
          line-height: 1.5em;
        `}
      >
        {user.about}
      </p>

      {user.link && (
        <p
          css={css`
            margin-top: 1rem;
            font-size: 1rem;
          `}
        >
          <a 
            href={user.link.startsWith('http') ? user.link : `https://${user.link}`} 
            target="_blank" 
            rel="noreferrer"
            css={css`
              display: inline-block;
        position: relative;
        text-decoration: none;
        color: inherit;
        margin: 0 var(--spacing, 0px);
        transition: margin .25s;
        svg {
            width: 250%;
            height: 250%;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 7px) translateZ(0);
            fill: none;
            stroke: var(--stroke, var(--line));
            stroke-linecap: round;
            stroke-width: 2px;
            stroke-dasharray: var(--offset, 69px) 278px;
            stroke-dashoffset: 361px;
            transition: stroke .25s ease var(--stroke-delay, 0s), stroke-dasharray .35s;
        }
        &:hover {
            --spacing: 4px;
            --stroke: var(--line-active);
            --stroke-delay: .1s;
            --offset: 180px;
        }
    }
            `}
          >
            {user.link}
        <svg viewBox="0 0 70 36">
            <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
        </svg>
          </a>
        </p>
      )}

      <ul
        id="posts"
        css={css`
          list-style: none;
          margin-top: 3rem;
        `}
      >
        {user.posts.map(post => (
          <li
            key={post.id}
            css={css`
              display: flex;
              margin: 2.5rem 0;

              a {
                text-decoration: none;
                color: inherit;
                display: block;
                width: 70%;
                margin-left: auto;
              }

              @media (max-width: 626px) {
                flex-direction: column;

                a {
                  width: 100%;
                }
              }
            `}
          >
            <p
              css={css`
                margin: 0.75rem 0;
                font-size: 0.9rem;
                color: var(--grey-3);
                margin: 0 auto auto 0;

                @media (max-width: 626px) {
                  margin-bottom: 1rem;
                }
              `}
            >
              {new Date(post.lastEdited).toDateString()}
            </p>

            <Link href={`/${user.name}/${post.slug}`}>
              <a>
                <h3
                  css={css`
                    font-size: 1rem;
                    font-weight: 400;
                    margin-bottom: 0.6rem;
                  `}
                >
                  {post.title ? htmlToText(post.title) : 'Untitled'}
                </h3>

                <p
                  css={css`
                    max-width: 25rem;
                    color: var(--grey-4);
                    font-family: 'Newsreader', serif;
                    line-height: 1.5em;
                  `}
                >
                  {post.excerpt
                    ? htmlToText(post.excerpt)
                    : truncate(htmlToText(post.content), 25)}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Person structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": user.displayName,
          "url": `https://bublr.life/${user.name}`,
          "image": user.photo,
          "description": user.about,
          "sameAs": user.link ? (user.link.startsWith('http') ? user.link : `https://${user.link}`) : undefined
        })
      }} />
    </Container>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { username } = params

  try {
    const user = await getUserByName(username)
    user.posts = user.posts.map(p => ({
      ...p,
      lastEdited: p.lastEdited.toDate().getTime(),
    }))
    user.posts.sort((a, b) => {
      return b.lastEdited - a.lastEdited
    })
    user.posts = user.posts.filter(p => p.published)
    return {
      props: { user },
      revalidate: 60, // Revalidate at most once per minute
    }
  } catch (err) {
    console.log(err)
    return { notFound: true }
  }
}