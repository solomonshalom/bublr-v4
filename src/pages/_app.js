import 'modern-normalize'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { Global, css } from '@emotion/react'
import { IdProvider } from '@radix-ui/react-id'
import { useRouter } from 'next/router'

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || (page => page)
  const router = useRouter()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#FCFCFC" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#171717" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Open Graph default fallback values */}
        {!router.pathname.includes('[') && (
          <>
            <meta property="og:site_name" content="Bublr" />
            <meta property="twitter:site" content="@bublr" />
          </>
        )}
      </Head>
      <Global
        styles={css`
          :root {
            --grey-1: #fcfcfc;
            --grey-2: #c7c7c7;
            --grey-3: #6f6f6f;
            --grey-4: #2e2e2e;
            --grey-5: #171717;
            --text: #2B3044;
            --line: #BBC1E1;
            --line-active: #275EFE;
          }

          [data-theme='dark'] {
            --grey-1: #171717;
            --grey-2: #2e2e2e;
            --grey-4: #c7c7c7;
            --grey-5: #fcfcfc;
            --mainColor: #fcfcfc;
          }

          [data-theme='light'] {
            --mainColor: #275EFE;
          }

          *,
          *::before,
          *::after {
            margin: 0;
            padding: 0;
          }

          html {
            font-size: 100%;
            color: var(--grey-4);
          }

          body {
            background: var(--grey-1);
            font-family: 'Inter', sans-serif;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: var(--grey-5);
            font-weight: 500;
          }

          @media (max-width: 420px) {
            html {
              font-size: 90%;
            }
          }

          a {
            background: linear-gradient(to bottom, var(--mainColor) 0%, var(--mainColor) 100%);
            background-position: 0 100%;
            background-repeat: repeat-x;
            background-size: 3px 3px;
            color: #000;
            text-decoration: none;
          }

          a:hover {
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
            background-position: 0 100%;
            background-size: auto 6px;
            background-repeat: repeat-x;
            text-decoration: none;
          }

          // Proesemirror
          .ProseMirror-focused {
            outline: none;
          }

          .ProseMirror .is-editor-empty:first-of-type::before {
            content: attr(data-placeholder);
            float: left;
            color: inherit;
            opacity: 0.5;
            pointer-events: none;
            height: 0;
          }

          .ProseMirror img {
            max-width: 100%;
            height: auto;
          }

          .ProseMirror img.ProseMirror-selectednode {
            box-shadow: 0 0 1rem var(--grey-2);
          }
        `}
      />
      <IdProvider>
        <ThemeProvider defaultTheme="system">
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </IdProvider>
    </>
  )
}

export default App