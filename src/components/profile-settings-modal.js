/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { gsap } from 'gsap'

import { firestore } from '../lib/firebase'
import { userWithNameExists } from '../lib/db'

import Spinner from './spinner'
import Input, { Textarea } from './input'
import ModalOverlay from './modal-overlay'
import Button, { IconButton } from './button'
import CustomDomainSettings from './custom-domain-settings'

const StyledLabel = props => (
  <label
    css={css`
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: var(--grey-3);
    `}
    {...props}
  >
    {props.children}
  </label>
)

function Editor({ user }) {
  const [clientUser, setClientUser] = useState({
    name: '',
    displayName: '',
    about: '',
    link: '',
    posts: [],
    photo: '',
    readingList: [],
  })
  const [usernameErr, setUsernameErr] = useState(null)

  useEffect(() => {
    setClientUser(user)
  }, [user])

  return (
    <>
      <div
        css={css`
          margin: 1.5rem 0 2.5rem 0;

          font-size: 0.9rem;

          input,
          textarea {
            width: 20em;
          }

          textarea {
            min-height: 12em;
            resize: none;
          }

          div {
            margin-bottom: 1.5rem;
          }
        `}
      >
        <div>
          <StyledLabel htmlFor="profile-display-name">Display Name</StyledLabel>
          <Input
            id="profile-display-name"
            type="text"
            value={clientUser.displayName}
            onChange={e =>
              setClientUser(prevUser => ({
                ...prevUser,
                displayName: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <StyledLabel htmlFor="profile-username">Name</StyledLabel>
          <Input
            id="profile-username"
            type="text"
            value={clientUser.name}
            onChange={e => {
              setUsernameErr(false)
              setClientUser(prevUser => ({
                ...prevUser,
                name: e.target.value,
              }))
            }}
          />
          {usernameErr !== null && (
            <p
              css={css`
                font-size: 0.9rem;
                color: var(--grey-3);
                width: 20rem;
                margin-top: 1rem;
              `}
            >
              {usernameErr}
            </p>
          )}
        </div>

        <div>
          <StyledLabel htmlFor="profile-link">Link</StyledLabel>
          <Input
            id="profile-link"
            type="text"
            value={clientUser.link || ''}
            onChange={e =>
              setClientUser(prevUser => ({
                ...prevUser,
                link: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <StyledLabel htmlFor="profile-about">About</StyledLabel>
          <Textarea
            id="profile-about"
            value={clientUser.about}
            onChange={e =>
              setClientUser(prevUser => ({
                ...prevUser,
                about: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <p
        css={css`
          font-size: 0.9rem;
          max-width: 20rem;
          margin-bottom: 1.5rem;
          margin-top: -1rem;
          word-wrap: break-word;

          a {
            text-decoration: none;
            color: inherit;
            font-style: italic;
            border-bottom: 1px dotted var(--grey-3);
          }
        `}
      >
        See your profile live at:{' '}
        <a target="_blank" rel="noreferrer" href={`/${user.name}`}>
          bublr.life/{user.name}
        </a>
      </p>

      <Button
        css={css`
          margin-left: auto;
          font-size: 0.9rem;
        `}
        outline
        disabled={
          user.name === clientUser.name &&
          user.displayName === clientUser.displayName &&
          user.about === clientUser.about &&
          user.link === clientUser.link &&
          !usernameErr
        }
        onClick={async () => {
          if (clientUser.name !== user.name) {
            let nameClashing = await userWithNameExists(clientUser.name)
            if (nameClashing) {
              setUsernameErr('That username is in use already.')
              return
            } else if (clientUser.name === '') {
              setUsernameErr('Username cannot be empty.')
              return
            } else if (!clientUser.name.match(/^[a-z0-9-]+$/i)) {
              setUsernameErr(
                'Username can only consist of letters (a-z,A-Z), numbers (0-9) and dashes (-).',
              )
              return
            } else if (clientUser.name === 'dashboard') {
              setUsernameErr('That username is reserved.')
              return
            }
          }

          let toSave = { ...clientUser }
          delete toSave.id
          await firestore.collection('users').doc(user.id).set(toSave)
          setUsernameErr(null)
        }}
      >
        Save changes
      </Button>

      <CustomDomainSettings user={user} />
    </>
  )
}

function ProfileEditor({ uid }) {
  const [user, userLoading, userError] = useDocumentData(
    firestore.doc(`users/${uid}`),
    {
      idField: 'id',
    },
  )

  if (userError) {
    return (
      <>
        <p>Oop, we&apos;ve had an error:</p>
        <pre>{JSON.stringify(userError)}</pre>
      </>
    )
  } else if (user) {
    return <Editor user={user} />
  }

  return <Spinner />
}

function AnimatedUnderline() {
  useEffect(() => {
    let mounted = true;
    
    const timeoutId = setTimeout(() => {
      if (!mounted) return;
      
      const loadDrawSVGPlugin = async () => {
        try {
          if (!window.DrawSVGPlugin) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js';
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
          }
          
          if (!mounted) return;
          
          gsap.registerPlugin(window.DrawSVGPlugin);
          
          const svgVariants = [
            `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
            `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
            `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`
          ];
          
          const box = document.querySelector('[data-modal-draw-line-box]');
          if (!box || !mounted) return;
          
          const randomIndex = Math.floor(Math.random() * svgVariants.length);
          box.innerHTML = svgVariants[randomIndex];
          const svg = box.querySelector('svg');
          if (svg) {
            svg.setAttribute('preserveAspectRatio', 'none');
            svg.querySelectorAll('path').forEach(path => {
              path.setAttribute('stroke', 'currentColor');
            });
            const path = svg.querySelector('path');
            if (path && mounted) {
              requestAnimationFrame(() => {
                gsap.set(path, { drawSVG: '0%' });
                gsap.to(path, {
                  duration: 0.3,
                  drawSVG: '100%',
                  ease: 'power2.inOut'
                });
              });
            }
          }
        } catch (error) {
          console.warn('Animation loading failed:', error);
        }
      };
      
      loadDrawSVGPlugin();
    }, 100);
    
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      data-modal-draw-line-box="" 
      css={css`
        color: #e55050;
        width: 80px;
        height: 0.625em;
        position: relative;
        margin-top: 0.5rem;
        
        svg {
          width: 100%;
          height: 100%;
          position: absolute;
          overflow: visible !important;
        }
      `}
    />
  );
}

export default function ProfileSettingsModal(props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <props.Trigger />
      </Dialog.Trigger>

      <ModalOverlay />

      <Dialog.Content
        css={css`
          background: var(--grey-1);
          border-radius: 0.5rem;
          padding: 1.5rem;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      >
        <Dialog.Title>Profile</Dialog.Title>
        <AnimatedUnderline />
        <Dialog.Description
          css={css`
            margin: 1rem 0 0.5rem 0;
            max-width: 20rem;
            color: var(--grey-3);
            font-size: 0.9rem;
          `}
        >
          Change your profile details and make sure to hit save when you&apos;re
          done.
        </Dialog.Description>

        <ProfileEditor uid={props.uid} />

        <Dialog.Close
          as={IconButton}
          css={css`
            position: absolute;
            top: 1rem;
            right: 1rem;
          `}
        >
          <Cross2Icon />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}