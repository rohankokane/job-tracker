import List from 'components/List'
import Counter from 'components/shared/Counter'
import {
  ModalContents,
  ModalHeader,
  useModalToggle,
} from 'components/shared/Modal'
import { useState } from 'react'
import { JobType, StateType } from 'types'
import { HEADING } from 'utils/status'
import JobInfo from '../JobInfo'
import JobList from '../JobList'
import styles from './JobListTable.module.scss'

const JobListTable = ({ state }: { state: StateType }) => {
  const setIsModalOpen = useModalToggle()
  const [modalData, setModalData] = useState<JobType>()
  const handleOpenModal = (index: number, status: string) => {
    console.log({ index, status })
    setModalData({ ...state[status][index] })
    setIsModalOpen(true)
  }
  const getUnavailableMessage = () => {
    return 'no jobs added'
  }

  return (
    <>
      {Object.keys(state).map((key, index) => {
        return (
          <div key={key + index} className={styles.listContainer}>
            <span className={styles.heading}>
              <span className={styles.headingIcon}>{HEADING[key]}</span>
              {key.toUpperCase()} <Counter value={state[key].length} />
            </span>
            <List key={key + index} dropId={key}>
              {state[key].length ? (
                <JobList
                  handleOpenModal={handleOpenModal}
                  list={state[key]}
                  key={key}
                  keyTitle={key}
                />
              ) : (
                <span className='unavailable'>{getUnavailableMessage()}</span>
              )}
            </List>
          </div>
        )
      })}
      {modalData?.jobTitle && (
        <ModalContents style={{ maxWidth: '520px' }} aria-label='job details'>
          <ModalHeader title={modalData.jobTitle} />
          <JobInfo data={modalData} />
        </ModalContents>
      )}
    </>
  )
}

export default JobListTable
