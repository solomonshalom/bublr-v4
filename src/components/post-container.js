/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from 'react'

const PostContainer = props => {
  useEffect(() => {
    // Add SVG elements to all links after component mounts
    const links = document.querySelectorAll('.post-container a');
    links.forEach(link => {
      // Only add SVG if it doesn't already exist
      if (!link.querySelector('svg')) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 70 36');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527');
        
        svg.appendChild(path);
        link.appendChild(svg);
      }
    });
  }, []);

  return (
  <div
    className="post-container"
    css={css`
      margin-top: 2rem;
      font-size: 1.125rem;
      line-height: 1.5em;

      font-family: 'Newsreader', serif;

      img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }

      a {
        display: inline-block;
        position: relative;
        text-decoration: none;
        color: var(--grey-5);
        margin: 0 var(--spacing, 0px);
        transition: margin .25s;
      }
      
      a svg {
        width: 76px;
        height: 40px;
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
      
      a:hover {
        --spacing: 4px;
        --stroke: var(--line-active);
        --stroke-delay: .1s;
        --offset: 180px;
      }

      p {
        margin: 1.2rem 0;
      }

      ul,
      ol {
        margin-left: 1.5rem;
      }

      blockquote,
      hr {
        margin: 1.5rem 0;
      }

      h1,
      h2,
      h3 {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        letter-spacing: -0.02em;
        margin: 2rem 0 0.5rem 0;
      }

      h1 {
        font-size: 1.5rem;
      }

      h2 {
        font-size: 1.25rem;
      }

      h3 {
        font-style: italic;
        font-size: 1.15rem;
      }

      blockquote > p {
        font-family: 'Inter', sans-serif;
        padding-left: 1.25rem;
        border-left: 0.15rem solid var(--grey-2);
      }

      pre {
        background: var(--grey-5);
        font-family: monospace;
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;
        overflow: auto;
      }

      code {
        font-size: 0.9rem;
        font-family: 'JetBrains Mono', monospace;

        background: rgba(0, 0, 0, 0.1);
        color: var(--grey-4);
        border-radius: 0.2rem;
        padding: 0.2rem;
      }

      pre code {
        background: none;
        color: var(--grey-2);
        border-radius: 0;
        padding: 0;
      }

      [data-theme='dark'] & {
        pre {
          background: var(--grey-2);
        }
        code {
          background: var(--grey-2);
        }
        pre code {
          background: none;
          color: var(--grey-4);
        }
      }
    `}
    {...props}
  >
    {props.children}
  </div>
)

export default PostContainer
