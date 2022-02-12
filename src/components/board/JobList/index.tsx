import { JobType } from 'types'
import JobCard from '../JobCard'

const JobList = ({
  list,
  keyTitle,
  handleOpenModal,
}: {
  list: JobType[]
  keyTitle: string
  handleOpenModal: (index: number, status: string) => void
}) => {
  return (
    <>
      {list.map((jobObj, index) => (
        <JobCard
          key={`${keyTitle}-${index}`}
          id={`${keyTitle}-${index}`}
          index={index}
          jobData={jobObj}
          onClick={handleOpenModal}
        />
      ))}
    </>
  )
}

export default JobList
