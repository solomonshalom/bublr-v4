/** @jsxImportSource @emotion/react */
import Link from 'next/link'
import Head from 'next/head'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { htmlToText } from 'html-to-text'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import Header from '../../components/header'
import Spinner from '../../components/spinner'
import Container from '../../components/container'
import ProfileSettingsModal from '../../components/profile-settings-modal'

import { truncate } from '../../lib/utils'
import { firestore, auth } from '../../lib/firebase'
import { getPostByID, getUserByID } from '../../lib/db'

function List({ uid }) {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const user = await getUserByID(uid)
      const postPromises = user.readingList.map(async pid => {
        const post = await getPostByID(pid)
        const author = await firestore
          .collection('users')
          .doc(post.author)
          .get()
        post.author = author.data()
        return post
      })
      const posts = await Promise.all(postPromises)
      console.log(posts)
      setList(posts)
    })()
  }, [uid])

  if (list.length > 0)
    return (
      <ul
        css={css`
          list-style: none;

          li {
            max-width: 25rem;
            margin: 2.5rem 0;

            a {
              text-decoration: none !important;
              color: inherit;
            }
          }
        `}
      >
        {list.map(post => (
          <li key={post.id}>
            <Link href={`/${post.author.name}/${post.slug}`}>
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

                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    color: var(--grey-3);
                    font-size: 0.9rem;
                  `}
                >
                  <img
                    src={post.author.photo}
                    alt="Profile picture"
                    css={css`
                      width: 1.5rem;
                      border-radius: 1rem;
                      margin-right: 0.75rem;
                    `}
                  />
                  <p>{post.author.displayName}</p>
                </div>

                <p
                  css={css`
                    color: var(--grey-4);
                    font-family: 'Newsreader', serif;
                    line-height: 1.5em;
                    margin-top: 0.5rem;
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
    )

  return <p>You have no posts saved to read later 😔</p>
}

export default function ReadingList() {
  const router = useRouter()
  const [user, userLoading, userError] = useAuthState(auth)

  useEffect(() => {
    console.log(user, userLoading, userError)
    if (!user && !userLoading && !userError) {
      router.push('/')
      return
    }
  }, [user, userLoading, userError])

  return (
    <>
      <Header>

        <Link href="/dashboard">
          <svg width="21" height="21" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382ZM9.8 1L9.74967 0.99997C9.52122 0.999752 9.32429 0.999564 9.14983 1.04145C8.60136 1.17312 8.17312 1.60136 8.04145 2.14983C7.99956 2.32429 7.99975 2.52122 7.99997 2.74967L8 2.8V5.2L7.99997 5.25033C7.99975 5.47878 7.99956 5.67572 8.04145 5.85017C8.17312 6.39864 8.60136 6.82688 9.14983 6.95856C9.32429 7.00044 9.52122 7.00025 9.74967 7.00003L9.8 7H12.2L12.2503 7.00003C12.4788 7.00025 12.6757 7.00044 12.8502 6.95856C13.3986 6.82688 13.8269 6.39864 13.9586 5.85017C14.0004 5.67572 14.0003 5.47878 14 5.25033L14 5.2V2.8L14 2.74967C14.0003 2.52122 14.0004 2.32429 13.9586 2.14983C13.8269 1.60136 13.3986 1.17312 12.8502 1.04145C12.6757 0.999564 12.4788 0.999752 12.2503 0.99997L12.2 1H9.8ZM9.38328 2.01382C9.42632 2.00348 9.49222 2 9.8 2H12.2C12.5078 2 12.5737 2.00348 12.6167 2.01382C12.7995 2.05771 12.9423 2.20045 12.9862 2.38328C12.9965 2.42632 13 2.49222 13 2.8V5.2C13 5.50779 12.9965 5.57369 12.9862 5.61672C12.9423 5.79955 12.7995 5.94229 12.6167 5.98619C12.5737 5.99652 12.5078 6 12.2 6H9.8C9.49222 6 9.42632 5.99652 9.38328 5.98619C9.20045 5.94229 9.05771 5.79955 9.01382 5.61672C9.00348 5.57369 9 5.50779 9 5.2V2.8C9 2.49222 9.00348 2.42632 9.01382 2.38328C9.05771 2.20045 9.20045 2.05771 9.38328 2.01382ZM2.74967 7.99997L2.8 8H5.2L5.25033 7.99997C5.47878 7.99975 5.67572 7.99956 5.85017 8.04145C6.39864 8.17312 6.82688 8.60136 6.95856 9.14983C7.00044 9.32429 7.00025 9.52122 7.00003 9.74967L7 9.8V12.2L7.00003 12.2503C7.00025 12.4788 7.00044 12.6757 6.95856 12.8502C6.82688 13.3986 6.39864 13.8269 5.85017 13.9586C5.67572 14.0004 5.47878 14.0003 5.25033 14L5.2 14H2.8L2.74967 14C2.52122 14.0003 2.32429 14.0004 2.14983 13.9586C1.60136 13.8269 1.17312 13.3986 1.04145 12.8502C0.999564 12.6757 0.999752 12.4788 0.99997 12.2503L1 12.2V9.8L0.99997 9.74967C0.999752 9.52122 0.999564 9.32429 1.04145 9.14983C1.17312 8.60136 1.60136 8.17312 2.14983 8.04145C2.32429 7.99956 2.52122 7.99975 2.74967 7.99997ZM2.8 9C2.49222 9 2.42632 9.00348 2.38328 9.01382C2.20045 9.05771 2.05771 9.20045 2.01382 9.38328C2.00348 9.42632 2 9.49222 2 9.8V12.2C2 12.5078 2.00348 12.5737 2.01382 12.6167C2.05771 12.7995 2.20045 12.9423 2.38328 12.9862C2.42632 12.9965 2.49222 13 2.8 13H5.2C5.50779 13 5.57369 12.9965 5.61672 12.9862C5.79955 12.9423 5.94229 12.7995 5.98619 12.6167C5.99652 12.5737 6 12.5078 6 12.2V9.8C6 9.49222 5.99652 9.42632 5.98619 9.38328C5.94229 9.20045 5.79955 9.05771 5.61672 9.01382C5.57369 9.00348 5.50779 9 5.2 9H2.8ZM9.8 8L9.74967 7.99997C9.52122 7.99975 9.32429 7.99956 9.14983 8.04145C8.60136 8.17312 8.17312 8.60136 8.04145 9.14983C7.99956 9.32429 7.99975 9.52122 7.99997 9.74967L8 9.8V12.2L7.99997 12.2503C7.99975 12.4788 7.99956 12.6757 8.04145 12.8502C8.17312 13.3986 8.60136 13.8269 9.14983 13.9586C9.32429 14.0004 9.52122 14.0003 9.74967 14L9.8 14H12.2L12.2503 14C12.4788 14.0003 12.6757 14.0004 12.8502 13.9586C13.3986 13.8269 13.8269 13.3986 13.9586 12.8502C14.0004 12.6757 14.0003 12.4788 14 12.2503L14 12.2V9.8L14 9.74967C14.0003 9.52122 14.0004 9.32429 13.9586 9.14983C13.8269 8.60136 13.3986 8.17312 12.8502 8.04145C12.6757 7.99956 12.4788 7.99975 12.2503 7.99997L12.2 8H9.8ZM9.38328 9.01382C9.42632 9.00348 9.49222 9 9.8 9H12.2C12.5078 9 12.5737 9.00348 12.6167 9.01382C12.7995 9.05771 12.9423 9.20045 12.9862 9.38328C12.9965 9.42632 13 9.49222 13 9.8V12.2C13 12.5078 12.9965 12.5737 12.9862 12.6167C12.9423 12.7995 12.7995 12.9423 12.6167 12.9862C12.5737 12.9965 12.5078 13 12.2 13H9.8C9.49222 13 9.42632 12.9965 9.38328 12.9862C9.20045 12.9423 9.05771 12.7995 9.01382 12.6167C9.00348 12.5737 9 12.5078 9 12.2V9.8C9 9.49222 9.00348 9.42632 9.01382 9.38328C9.05771 9.20045 9.20045 9.05771 9.38328 9.01382Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </Link>

        <Link href="/explore">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 9.1a4.9 4.9 0 1 1-9.8 0 4.9 4.9 0 0 1 9.8 0m-.967 4.922a6.3 6.3 0 1 1 .99-.99l3.973 3.972a.7.7 0 0 1-.991.991z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/></svg>
        </Link>

        <ProfileSettingsModal Trigger={() => <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 1.225a5.075 5.075 0 0 0-1.408 9.953c-1.672.203-3.105.794-4.186 1.859-1.375 1.354-2.071 3.371-2.071 6.003a.665.665 0 1 0 1.33 0c0-2.408.634-4.032 1.674-5.057 1.042-1.026 2.598-1.558 4.661-1.558s3.619.532 4.662 1.558c1.039 1.026 1.673 2.649 1.673 5.057a.665.665 0 1 0 1.33 0c0-2.632-.696-4.648-2.072-6.003-1.078-1.064-2.513-1.656-4.185-1.859A5.078 5.078 0 0 0 10.5 1.225M6.755 6.3a3.745 3.745 0 1 1 7.49 0 3.745 3.745 0 0 1-7.49 0" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/></svg>} uid={user?.uid} />
        <button onClick={() => auth.signOut()}>
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.2 1.4a1.4 1.4 0 0 0-1.4 1.4v15.4a1.4 1.4 0 0 0 1.4 1.4h10.5a.7.7 0 0 0 0-1.4H4.2V2.8h10.5a.7.7 0 0 0 0-1.4zm13.446 5.454a.7.7 0 0 0-.991.991L18.61 9.8H9.1a.7.7 0 0 0 0 1.4h9.51l-1.956 1.954a.7.7 0 0 0 .991.991l3.15-3.15a.7.7 0 0 0 0-.991z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/></svg>
        </button>

      </Header>

      {userError ? (
        <>
          <p>Oop, we&apos;ve had an error:</p>
          <pre>{JSON.stringify(error)}</pre>
        </>
      ) : user ? (
        <List uid={user.uid} />
      ) : (
        <Spinner />
      )}
    </>
  )
}

ReadingList.getLayout = function ReadingListLayout(page) {
  return (
    <Container
      maxWidth="640px"
      css={css`
        margin-top: 5rem;
      `}
    >
      <Head>
        <title>Reading List / Bublr</title>
        <meta name="robots" content="noindex, nofollow" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="https://www.justice.rest/justicerest.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="a0cdb368-20ae-4630-8949-ac57917e2ae3"></script>
      </Head>
      {page}
    </Container>
  )
}
