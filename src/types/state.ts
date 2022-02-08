export type JobType = {
  id: string
  jobTitle: string
  company: string
  lastUpdated: number
  deadline: number
  location: string
  link: string
  description: string
  salary: string
  status: string
  logoUrl: string
}

export type StateType = {
  [k: string]: JobType[]
}
