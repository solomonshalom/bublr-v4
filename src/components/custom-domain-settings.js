/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Button from './button'
import Input from './input'
import Spinner from './spinner'

import { isValidDomain } from '../lib/utils'

const sectionStyles = css`
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--grey-2);
`

const labelStyles = css`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--grey-3);
`

const helperStyles = css`
  font-size: 0.85rem;
  color: var(--grey-3);
  margin-top: 0.75rem;
  line-height: 1.4;
`

const statusStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  background: var(--grey-2);
  color: var(--grey-5);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
`

const actionsStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`

function StatusBadge({ status, subscriptionActive }) {
  const label = useMemo(() => {
    if (subscriptionActive && status === 'active') return 'Active'
    if (!subscriptionActive && status === 'active') return 'Awaiting billing'
    if (status === 'cancelled') return 'Cancelled'
    if (status === 'expired') return 'Expired'
    if (status === 'failed') return 'Payment failed'
    if (status === 'on_hold') return 'On hold'
    if (status === 'inactive') return 'Inactive'
    return status || 'Unknown'
  }, [status, subscriptionActive])

  return (
    <span css={statusStyles}>
      <span
        css={css`
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: ${subscriptionActive && status === 'active' ? '#26a65b' : '#f6a609'};
        `}
      />
      {label}
    </span>
  )
}

export default function CustomDomainSettings({ user }) {
  const [loading, setLoading] = useState(true)
  const [domain, setDomain] = useState('')
  const [status, setStatus] = useState('inactive')
  const [subscriptionStatus, setSubscriptionStatus] = useState('missing')
  const [subscriptionActive, setSubscriptionActive] = useState(false)
  const [subscriptionId, setSubscriptionId] = useState(null)
  const [customerId, setCustomerId] = useState(null)
  const [formValue, setFormValue] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const resetMessages = () => {
    setMessage(null)
    setError(null)
  }

  const fetchStatus = useCallback(async () => {
    if (!user?.id) return

    setLoading(true)
    resetMessages()

    try {
      const response = await fetch(`/api/custom-domain?uid=${user.id}`)
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || 'Unable to load custom domain settings')
      }

      const payload = await response.json()
      setDomain(payload.domain || '')
      setFormValue(payload.domain || '')
      setStatus(payload.status || 'inactive')
      setSubscriptionId(payload.subscriptionId || null)
      setSubscriptionActive(Boolean(payload.subscriptionActive))
      setSubscriptionStatus(payload.subscriptionStatus || 'unknown')
      setCustomerId(payload.customerId || null)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError(err.message)
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  const handleSaveDomain = async () => {
    resetMessages()

    if (!isValidDomain(formValue)) {
      setError('Enter a valid domain name such as example.com')
      return
    }

    if (!subscriptionActive) {
      setError('Activate your custom domain subscription first.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/custom-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.id, domain: formValue }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to save domain')
      }

      setMessage('Custom domain saved successfully.')
      setDomain(payload.domain || formValue)
      setStatus(payload.status || 'active')
      setSubscriptionActive(Boolean(payload.subscriptionActive ?? true))
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleUnlinkDomain = async () => {
    resetMessages()

    setSubmitting(true)
    try {
      const response = await fetch('/api/custom-domain', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.id }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || 'Unable to unlink domain')
      }

      setMessage('Custom domain removed. Your profile now uses the default username URL.')
      setDomain('')
      setFormValue('')
      setStatus('inactive')
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const startCheckout = async () => {
    resetMessages()
    try {
      const response = await fetch('/api/dodo/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.id,
          email: user.email,
          metadata: { currentDomain: formValue || domain },
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok || !payload.checkout_url) {
        throw new Error(payload.error || 'Unable to start checkout flow')
      }

      window.location.href = payload.checkout_url
    } catch (err) {
      console.error(err)
      setError(err.message)
      setSubmitting(false)
    }
  }

  const openCustomerPortal = async () => {
    resetMessages()

    if (!customerId) {
      setError('Customer portal becomes available after your first payment is processed.')
      return
    }

    try {
      const response = await fetch(`/api/dodo/customer-portal?customer_id=${customerId}`)
      const payload = await response.json().catch(() => ({}))
      const portalUrl = payload.url || payload.portal_url
      if (!response.ok || !portalUrl) {
        throw new Error(payload.error || 'Unable to open customer portal')
      }

      window.location.href = portalUrl
    } catch (err) {
      console.error(err)
      setError(err.message)
      setSubmitting(false)
    }
  }

  const refreshStatus = async () => {
    resetMessages()
    setSubmitting(true)
    await fetchStatus()
    setSubmitting(false)
  }

  const handleSubscriptionAction = async () => {
    setSubmitting(true)
    try {
      if (subscriptionActive) {
        await openCustomerPortal()
      } else {
        await startCheckout()
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section css={sectionStyles}>
      <h3 css={css`margin-bottom: 1rem; font-size: 1.1rem;`}>Custom domain</h3>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <p css={helperStyles}>
            Link a domain you own to publish your profile at a fully branded URL. Custom domains are part of the
            $2/month subscription.
          </p>

          <div
            css={css`
              margin-top: 1.5rem;
            `}
          >
            <label css={labelStyles} htmlFor="custom-domain-input">
              Domain name
            </label>
            <Input
              id="custom-domain-input"
              placeholder="example.com"
              value={formValue}
              disabled={submitting}
              onChange={event => setFormValue(event.target.value)}
            />
          </div>

          <div
            css={css`
              margin-top: 1rem;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            `}
          >
            <StatusBadge status={status} subscriptionActive={subscriptionActive} />
            <span css={helperStyles}>
              Subscription status: <strong>{subscriptionStatus}</strong>
              {subscriptionId && ` · Subscription ID: ${subscriptionId}`}
            </span>
          </div>

          {error && (
            <p
              css={css`
                margin-top: 1rem;
                font-size: 0.9rem;
                color: #e55050;
              `}
            >
              {error}
            </p>
          )}

          {message && (
            <p
              css={css`
                margin-top: 1rem;
                font-size: 0.9rem;
                color: #26a65b;
              `}
            >
              {message}
            </p>
          )}

          <div css={actionsStyles}>
            <Button outline onClick={handleSubscriptionAction} disabled={submitting}>
              {subscriptionActive ? 'Manage subscription' : 'Subscribe for $2/month'}
            </Button>
            <Button outline onClick={refreshStatus} disabled={submitting || loading}>
              Refresh status
            </Button>
            <Button onClick={handleSaveDomain} disabled={submitting || !formValue}>
              Save custom domain
            </Button>
            {domain && (
              <Button outline onClick={handleUnlinkDomain} disabled={submitting}>
                Remove domain
              </Button>
            )}
          </div>

          <p css={helperStyles}>
            After saving your domain, point your DNS A record to your Bublr deployment and allow up to 24 hours for
            propagation. We verify subscription status on every update to keep your domain active.
          </p>
        </>
      )}
    </section>
  )
}
