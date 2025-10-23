/** @jsxImportSource @emotion/react */
import Link from 'next/link'
import Head from 'next/head'
import { css } from '@emotion/react'
import { htmlToText } from 'html-to-text'
import { useEffect, useMemo } from 'react'
import { gsap } from 'gsap'

import { truncate, formatDate } from '../lib/utils'

import meta from './meta'
import Container from './container'

export default function ProfileView({ user, canonicalUrl }) {
  const resolvedCanonicalUrl = useMemo(() => {
    if (canonicalUrl) {
      return canonicalUrl
    }

    if (user?.customDomain?.domain) {
      return `https://${user.customDomain.domain}`
    }

    return `https://bublr.life/${user?.name}`
  }, [canonicalUrl, user])

  useEffect(() => {
    let mounted = true

    if (!user.link) return

    const timeoutId = setTimeout(() => {
      if (!mounted) return

      const loadDrawSVGPlugin = async () => {
        try {
          if (!window.DrawSVGPlugin) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script')
              script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js'
              script.onload = resolve
              script.onerror = reject
              document.head.appendChild(script)
            })
          }

          if (!mounted) return

          gsap.registerPlugin(window.DrawSVGPlugin)

          const svgVariants = [
            `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
            `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
            `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`
          ]

          const decorateSVG = svgEl => {
            svgEl.setAttribute('preserveAspectRatio', 'none')
            svgEl.querySelectorAll('path').forEach(path => {
              path.setAttribute('stroke', 'currentColor')
            })
          }

          const container = document.querySelector('[data-draw-line]')
          const box = container?.querySelector('[data-draw-line-box]')
          if (!box || !mounted) return

          const randomIndex = Math.floor(Math.random() * svgVariants.length)
          box.innerHTML = svgVariants[randomIndex]
          const svg = box.querySelector('svg')
          if (svg) {
            decorateSVG(svg)
            const path = svg.querySelector('path')
            if (path && mounted) {
              requestAnimationFrame(() => {
                gsap.set(path, { drawSVG: '0%' })
                gsap.to(path, {
                  duration: 0.3,
                  drawSVG: '100%',
                  ease: 'power2.inOut',
                })
              })
            }
          }
        } catch (error) {
          console.warn('Animation loading failed:', error)
        }
      }

      loadDrawSVGPlugin()
    }, 100)

    return () => {
      mounted = false
      clearTimeout(timeoutId)
    }
  }, [user.link])

  return (
    <Container maxWidth="640px">
      <Head>
        {meta({
          title: `${user.displayName} (@${user.name}) | Bublr`,
          description:
            user.about || `Check out ${user.displayName}'s writing on Bublr, an open-source community for writers.`,
          url: resolvedCanonicalUrl,
          image: user.photo,
          keywords: `${user.displayName}, ${user.name}, writer, author, blog, writing`,
        })}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href={resolvedCanonicalUrl} />
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
            data-draw-line=""
            href={user.link.startsWith('http') ? user.link : `https://${user.link}`}
            target="_blank"
            rel="noreferrer"
            css={css`
              color: inherit;
              margin-left: 0em;
              margin-right: 1em;
              text-decoration: none;
              display: inline-block;
            `}
          >
            <p
              css={css`
                margin-bottom: 0;
                font-weight: 500;
                line-height: 1.1;
              `}
            >
              {user.link}
            </p>
            <div
              data-draw-line-box=""
              css={css`
                color: #e55050;
                width: 100%;
                height: 0.625em;
                position: relative;

                svg {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  overflow: visible !important;
                }
              `}
            ></div>
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

              @media (max-width: 720px) {
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                margin-right: 2.5rem;

                span {
                  font-size: 0.9rem;
                  color: var(--grey-3);
                }
              `}
            >
              <span>{formatDate(post.lastEdited)}</span>
            </div>

            <Link href={`/${user.name}/${post.slug}`} passHref>
              <a
                css={css`
                  text-decoration: none;
                  color: inherit;
                  margin-right: 2.5rem;

                  @media (max-width: 720px) {
                    margin-right: 0;
                  }
                `}
              >
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
                  {post.excerpt ? htmlToText(post.excerpt) : truncate(htmlToText(post.content), 25)}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: user.displayName,
            url: resolvedCanonicalUrl,
            image: user.photo,
            description: user.about,
            sameAs: user.link
              ? user.link.startsWith('http')
                ? user.link
                : `https://${user.link}`
              : undefined,
          }),
        }}
      />
    </Container>
  )
}
