import { JobType } from 'types'

function JobInfo({ data }: { data: JobType }) {
  return <div>{data.company}</div>
}

export default JobInfo
