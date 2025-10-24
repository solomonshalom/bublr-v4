/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { toggleUpvote, hasUserUpvoted } from '../lib/db'

const upvoteButtonStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--grey-2);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 200ms ease;
  min-width: 3rem;

  &:hover:not(:disabled) {
    background: var(--grey-2);
    border-color: var(--grey-3);
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .upvote-icon {
    font-size: 1.25rem;
    transition: all 200ms ease;
  }

  &.active {
    border-color: #10B981;
    background: rgba(16, 185, 129, 0.1);

    .upvote-icon {
      color: #10B981;
    }

    &:hover:not(:disabled) {
      background: rgba(16, 185, 129, 0.2);
      border-color: #34D399;
    }
  }

  .upvote-count {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--grey-4);
  }

  &.active .upvote-count {
    color: #10B981;
  }
`

const tooltipStyles = css`
  position: relative;

  &[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 0.75rem;
    background: var(--grey-5);
    color: var(--grey-1);
    border-radius: 0.33rem;
    white-space: nowrap;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    z-index: 1000;
    pointer-events: none;
  }

  &[data-tooltip]:hover::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 0.375rem solid transparent;
    border-top-color: var(--grey-5);
    margin-bottom: 0.125rem;
    z-index: 1000;
    pointer-events: none;
  }
`

export default function UpvoteButton({ postId, userId, initialUpvotes = 0, initialHasUpvoted = false }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (userId && postId) {
      hasUserUpvoted(postId, userId).then(setHasUpvoted)
    }
  }, [postId, userId])

  const handleUpvote = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!userId || isLoading) return

    setIsLoading(true)
    const prevUpvotes = upvotes
    const prevHasUpvoted = hasUpvoted

    setHasUpvoted(!hasUpvoted)
    setUpvotes(hasUpvoted ? upvotes - 1 : upvotes + 1)

    try {
      await toggleUpvote(postId, userId)
    } catch (error) {
      console.error('Error toggling upvote:', error)
      setHasUpvoted(prevHasUpvoted)
      setUpvotes(prevUpvotes)
    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled = !userId || isLoading

  return (
    <button
      css={[upvoteButtonStyles, tooltipStyles]}
      className={hasUpvoted ? 'active' : ''}
      onClick={handleUpvote}
      disabled={isDisabled}
      data-tooltip={!userId ? 'Sign in to upvote' : ''}
    >
      <span className="upvote-icon">▲</span>
      <span className="upvote-count">{upvotes}</span>
    </button>
  )
}