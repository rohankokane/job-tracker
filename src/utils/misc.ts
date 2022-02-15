export const formatDate = (date: number) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(
    date
  )

export function timeSince(date: number) {
  const seconds = Math.floor((new Date().valueOf() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years ago'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days ago'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hr ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' min ago'
  }
  if (seconds === 0) return 'now'
  return Math.floor(seconds) + ' sec ago'
}
