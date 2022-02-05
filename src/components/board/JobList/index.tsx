import { JobType } from 'types'
import JobCard from '../JobCard'

const JobList = ({ list, keyTitle }: { list: JobType[]; keyTitle: string }) => {
  return (
    <>
      {list.map((jobObj, index) => (
        <JobCard
          key={`${keyTitle}-${index}`}
          id={`${keyTitle}-${index}`}
          index={index}
          jobData={jobObj}
        />
      ))}
    </>
  )
}

export default JobList
