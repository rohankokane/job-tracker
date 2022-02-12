export type JobType = {
  id?: string
  jobTitle: string
  company: string
  lastUpdated?: number
  deadline?: number
  location: string
  link: string
  description: string
  salary: string
  status: string
  logoUrl: string
  companyData: CompanyData
  notes: string
}

export type StateType = {
  [k: string]: JobType[]
}

export type CompanyData = {
  domain?: string
  logo?: string | undefined
  name: string
}
