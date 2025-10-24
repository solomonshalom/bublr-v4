/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { gsap } from 'gsap'
import axios from 'axios'

import { firestore, auth } from '../lib/firebase'
import { userWithNameExists } from '../lib/db'

import Spinner from './spinner'
import Input, { Textarea } from './input'
import ModalOverlay from './modal-overlay'
import Button, { IconButton } from './button'

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

function CustomDomainSection({ userId }) {
  const [authUser] = useAuthState(auth)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [domain, setDomain] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchSubscriptionStatus()
  }, [authUser])

  const fetchSubscriptionStatus = async () => {
    if (!authUser) return
    
    setLoading(true)
    setError(null)
    try {
      const token = await authUser.getIdToken()
      const response = await axios.get('/api/subscription/status', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSubscription(response.data)
      if (response.data.customDomain) {
        setDomain(response.data.customDomain)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load subscription status')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!authUser) return
    
    try {
      const token = await authUser.getIdToken()
      const response = await axios.post('/api/subscription/create-checkout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.payment_link) {
        window.location.href = response.data.payment_link
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create checkout session')
    }
  }

  const handleSaveDomain = async () => {
    if (!authUser || !domain) return
    
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const token = await authUser.getIdToken()
      const response = await axios.post('/api/domain/set', 
        { domain },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage({ type: 'success', text: response.data.message })
      await fetchSubscriptionStatus()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save domain')
    } finally {
      setSaving(false)
    }
  }

  const handleVerifyDomain = async () => {
    if (!authUser) return
    
    setVerifying(true)
    setError(null)
    setMessage(null)
    try {
      const token = await authUser.getIdToken()
      const response = await axios.post('/api/domain/verify', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage({ type: 'success', text: response.data.message })
      await fetchSubscriptionStatus()
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'DNS verification failed')
    } finally {
      setVerifying(false)
    }
  }

  const handleRemoveDomain = async () => {
    if (!authUser || !confirm('Are you sure you want to remove your custom domain?')) return
    
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const token = await authUser.getIdToken()
      const response = await axios.post('/api/domain/remove', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage({ type: 'success', text: response.data.message })
      setDomain('')
      await fetchSubscriptionStatus()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to remove domain')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div css={css`margin: 2rem 0;`}>
        <h3 css={css`font-size: 1rem; margin-bottom: 1rem;`}>Custom Domain</h3>
        <Spinner />
      </div>
    )
  }

  const isSubscribed = subscription?.subscriptionStatus === 'active' || 
                       (subscription?.subscriptionStatus === 'on_hold' && subscription?.isInGracePeriod)

  return (
    <div css={css`
      margin: 2.5rem 0;
      padding: 1.5rem;
      border: 1px solid var(--grey-2);
      border-radius: 0.5rem;
    `}>
      <h3 css={css`
        font-size: 1rem;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `}>
        Custom Domain
        {isSubscribed && <span css={css`
          font-size: 0.75rem;
          padding: 0.25em 0.5em;
          background: #22c55e;
          color: white;
          border-radius: 0.25rem;
        `}>Active</span>}
        {subscription?.isInGracePeriod && <span css={css`
          font-size: 0.75rem;
          padding: 0.25em 0.5em;
          background: #f59e0b;
          color: white;
          border-radius: 0.25rem;
        `}>Grace Period</span>}
      </h3>

      {error && (
        <p css={css`
          color: #ef4444;
          font-size: 0.9rem;
          margin: 1rem 0;
          padding: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 0.25rem;
        `}>{error}</p>
      )}

      {message && (
        <p css={css`
          color: ${message.type === 'success' ? '#22c55e' : '#f59e0b'};
          font-size: 0.9rem;
          margin: 1rem 0;
          padding: 0.75rem;
          background: ${message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)'};
          border-radius: 0.25rem;
        `}>{message.text}</p>
      )}

      {!isSubscribed ? (
        <>
          <p css={css`
            color: var(--grey-4);
            font-size: 0.9rem;
            margin: 1rem 0;
            line-height: 1.5;
          `}>
            Access your profile via your own domain. Only $2/month.
          </p>
          <Button 
            onClick={handleSubscribe}
            css={css`font-size: 0.9rem;`}
          >
            Subscribe for $2/month →
          </Button>
        </>
      ) : subscription?.customDomainActive ? (
        <>
          <p css={css`
            color: var(--grey-4);
            font-size: 0.9rem;
            margin: 1rem 0;
          `}>
            <strong css={css`color: var(--grey-5);`}>{subscription.customDomain}</strong>
          </p>
          <p css={css`
            color: #22c55e;
            font-size: 0.9rem;
            margin: 0.5rem 0 1rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `}>
            ✓ Active and verified
          </p>
          <p css={css`
            color: var(--grey-3);
            font-size: 0.9rem;
            margin: 1rem 0;
          `}>
            Your profile is accessible at:<br />
            <a 
              href={`https://${subscription.customDomain}`}
              target="_blank"
              rel="noreferrer"
              css={css`
                color: var(--grey-5);
                text-decoration: underline;
              `}
            >
              https://{subscription.customDomain}
            </a>
          </p>
          <div css={css`
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
          `}>
            <Button
              outline
              onClick={() => {
                setDomain('')
                fetchSubscriptionStatus().then(() => {
                  const sub = subscription
                  sub.customDomainActive = false
                  setSubscription(sub)
                })
              }}
              css={css`font-size: 0.9rem;`}
            >
              Change Domain
            </Button>
            <Button
              outline
              onClick={handleRemoveDomain}
              disabled={saving}
              css={css`font-size: 0.9rem;`}
            >
              {saving ? 'Removing...' : 'Remove Domain'}
            </Button>
          </div>
        </>
      ) : subscription?.customDomain && !subscription?.domainVerified ? (
        <>
          <p css={css`
            color: var(--grey-4);
            font-size: 0.9rem;
            margin: 1rem 0;
          `}>
            <strong css={css`color: var(--grey-5);`}>{subscription.customDomain}</strong>
          </p>
          <p css={css`
            color: #f59e0b;
            font-size: 0.9rem;
            margin: 0.5rem 0 1rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `}>
            ⏳ Verifying DNS...
          </p>
          <div css={css`
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 1rem;
          `}>
            <Button
              onClick={handleVerifyDomain}
              disabled={verifying}
              css={css`font-size: 0.9rem;`}
            >
              {verifying ? 'Checking...' : 'Check DNS Now'}
            </Button>
            <Button
              outline
              onClick={() => {
                setDomain('')
                const sub = subscription
                sub.customDomain = null
                setSubscription(sub)
              }}
              css={css`font-size: 0.9rem;`}
            >
              Change Domain
            </Button>
          </div>
          <div css={css`
            background: var(--grey-1);
            border: 1px solid var(--grey-2);
            padding: 1rem;
            border-radius: 0.5rem;
            font-size: 0.85rem;
            color: var(--grey-4);
            line-height: 1.6;
          `}>
            <p css={css`font-weight: 600; margin-bottom: 0.5rem;`}>DNS Setup Instructions:</p>
            <p css={css`margin-bottom: 0.5rem;`}>
              1. Go to your domain registrar (GoDaddy, Namecheap, etc.)<br />
              2. Add a CNAME record pointing to: <strong>{process.env.NEXT_PUBLIC_APP_DOMAIN || 'bublr.life'}</strong>
            </p>
            <p css={css`color: var(--grey-3); font-size: 0.8rem;`}>
              DNS may take up to 48 hours to propagate.
            </p>
          </div>
        </>
      ) : (
        <>
          <p css={css`
            color: var(--grey-4);
            font-size: 0.9rem;
            margin: 1rem 0;
          `}>
            Enter your custom domain below:
          </p>
          <Input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="blog.example.com"
            css={css`margin-bottom: 1rem;`}
          />
          <Button
            onClick={handleSaveDomain}
            disabled={!domain || saving}
            css={css`font-size: 0.9rem;`}
          >
            {saving ? 'Saving...' : 'Save Domain'}
          </Button>
          <div css={css`
            background: var(--grey-1);
            border: 1px solid var(--grey-2);
            padding: 1rem;
            border-radius: 0.5rem;
            font-size: 0.85rem;
            color: var(--grey-4);
            line-height: 1.6;
            margin-top: 1rem;
          `}>
            <p css={css`font-weight: 600; margin-bottom: 0.5rem;`}>DNS Setup Instructions:</p>
            <p>
              After saving, you'll need to add a CNAME record at your domain registrar pointing to: <strong>{process.env.NEXT_PUBLIC_APP_DOMAIN || 'bublr.life'}</strong>
            </p>
          </div>
        </>
      )}

      {subscription?.isInGracePeriod && (
        <div css={css`
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid #f59e0b;
          border-radius: 0.5rem;
          color: var(--grey-5);
          font-size: 0.9rem;
        `}>
          ⚠️ <strong>Payment Failed - Grace Period</strong><br />
          Your domain will be deactivated in {subscription.gracePeriodDaysLeft} day{subscription.gracePeriodDaysLeft !== 1 ? 's' : ''}. Please update your payment method.
        </div>
      )}
    </div>
  )
}

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

      <CustomDomainSection userId={user.id} />
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