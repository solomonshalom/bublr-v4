/** @jsxImportSource @emotion/react */
import Head from 'next/head'
import { css } from '@emotion/react'

import Container from '../components/container'

export default function NotFound() {
  return (
    <Container maxWidth="640px">
      <Head>
        <title>404 - Page Not Found | Bublr</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="The page you were looking for, it's not here but maybe, one day it would" />
      </Head>
      <h1>404</h1>
      <p
        css={css`
          margin-top: 1.5rem;
        `}
      >
        Looks like we can&apos;t find what you were looking for.
      </p>
    </Container>
  )
}