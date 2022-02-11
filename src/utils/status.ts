export const statusList = [
  { label: 'Saved', icon: '🗃️', value: 'saved' },
  { label: 'Applied', icon: '⚡', value: 'applied' },
  { label: 'Interview', icon: '🚀', value: 'interview' },
  { label: 'Offer', icon: '🏆', value: 'offer' },
  { label: 'Rejected', icon: '💣', value: 'rejected' },
]

// export const statusList = ['saved', 'applied', 'interview', 'offer', 'rejected']

type headingType = {
  [k: string]: string
}
export const HEADING: headingType = {
  saved: '🗃️',
  applied: '⚡',
  interview: '🚀',
  offer: '🏆',
  rejected: '💣',
}
