import React from 'react'
import { ModalAction } from 'reducers/modalReducer'
import { JobType } from 'types'
import JobCard from '../JobCard'

function JobList({
  list,
  keyTitle,
  modalDispatch,
}: {
  list: JobType[]
  keyTitle: string
  modalDispatch: React.Dispatch<ModalAction>
}) {
  return (
    <>
      {list.map((jobObj, index) => (
        <JobCard
          key={`${keyTitle}-${index}`}
          status={keyTitle}
          index={index}
          company={jobObj.company}
          jobTitle={jobObj.jobTitle}
          logoUrl={jobObj?.logoUrl}
          lastUpdated={jobObj.lastUpdated}
          modalDispatch={modalDispatch}
        />
      ))}
    </>
  )
}

// export default JobList
export default React.memo(JobList)
