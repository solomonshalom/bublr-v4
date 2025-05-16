/** @jsxImportSource @emotion/react */
import Head from 'next/head'
import { css } from '@emotion/react'

import Container from '../components/container'

export default function NotFound() {
  return (
    <Container maxWidth="640px">
      <Head>
        <title>Not Found</title>

        <script defer src="https://cloud.umami.is/script.js" data-website-id="a0cdb368-20ae-4630-8949-ac57917e2ae3"></script>
      
        <link rel="manifest" href="https://www.justice.rest/justicerest.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
      
      </Head>
      <h1>404</h1>
      <p
        css={css`
          margin-top: 1.5rem;
        `}
      >
        OH NO! You have found ___. Return by clicking <a href="https://justice.rest/dashboard">here</a>
      </p>
    </Container>
  )
}