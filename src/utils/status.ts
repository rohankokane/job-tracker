export const statusList = [
  { label: 'Saved', icon: '🗃️', value: 'saved' },
  { label: 'Applied', icon: '⚡', value: 'applied' },
  { label: 'Interview', icon: '🚀', value: 'interview' },
  { label: 'Offer', icon: '🏆', value: 'offer' },
  { label: 'Rejected', icon: '💣', value: 'rejected' },
]
type listObject = {
  [k: string]: {
    label: string
    icon: string
    value: string
  }
}
export const statusListObject: listObject = {
  saved: { label: 'Saved', icon: '🗃️', value: 'saved' },
  applied: { label: 'Applied', icon: '⚡', value: 'applied' },
  interview: { label: 'Interview', icon: '🚀', value: 'interview' },
  offer: { label: 'Offer', icon: '🏆', value: 'offer' },
  rejected: { label: 'Rejected', icon: '💣', value: 'rejected' },
}

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
