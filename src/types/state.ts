export type JobType = {
  id: string
  title: string
  company: string
  lastUpdated: number
  deadline: number
  location: string
  link: string
  description: string
  salary: string
  status: string
  imgUrl: string
}

export type StateType = {
  [k: string]: JobType[]
}
