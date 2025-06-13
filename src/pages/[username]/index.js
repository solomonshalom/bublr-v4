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
          background: linear-gradient(to bottom, var(--mainColor) 0%, var(--mainColor) 100%);
	        background-position: 0 100%;
	        background-repeat: repeat-x;
	        background-size: 3px 3px;
          color: #000;
          text-decoration: none;
        }
        &:hover {
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
            background-position: 0 100%;
            background-size: auto 6px;
            background-repeat: repeat-x;
            text-decoration: none;
        }
    }
            `}
          >
            {user.link}
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