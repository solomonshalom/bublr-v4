import ProfileView from '../../components/profile-view'
import { getUserByName, getUserByCustomDomain, normalizeCustomDomain } from '../../lib/db'

export default function Profile({ user }) {
  const canonicalUrl = user.customDomain?.domain
    ? `https://${user.customDomain.domain}`
    : `https://bublr.life/${user.name}`

  return <ProfileView user={user} canonicalUrl={canonicalUrl} />
}

export async function getServerSideProps({ params, req }) {
  const { username } = params
  const host = req?.headers?.host || ''
  const normalizedHost = normalizeCustomDomain(host)
  const defaultHosts = (process.env.NEXT_PUBLIC_APP_HOSTS || 'localhost:3000,bublr.life')
    .split(',')
    .map(h => h.trim().toLowerCase())
    .filter(Boolean)
  const shouldUseCustomDomain = normalizedHost && !defaultHosts.includes(normalizedHost)

  let user = null

  if (shouldUseCustomDomain) {
    try {
      user = await getUserByCustomDomain(normalizedHost)
    } catch (error) {
      if (error?.code !== 'user/not-found') {
        console.error('Failed to resolve custom domain user for profile page', error)
      }
    }
  }

  if (!user) {
    try {
      user = await getUserByName(username)
    } catch (error) {
      console.error('Failed to load profile by username', error)
      return { notFound: true }
    }
  }

  const processedPosts = user.posts
    .filter(p => p.published)
    .map(p => ({
      ...p,
      lastEdited: p.lastEdited?.toDate?.()
        ? p.lastEdited.toDate().getTime()
        : p.lastEdited?.toMillis?.() || Date.now(),
    }))
    .sort((a, b) => b.lastEdited - a.lastEdited)
    .slice(0, 20)

  user.posts = processedPosts

  return {
    props: { user },
  }
}
