import VisuallyHidden from '@reach/visually-hidden'
import CreateJobForm from 'components/Form/CreateJobForm'
import List from 'components/List'
import CircleButton from 'components/shared/CircleButton'
import Counter from 'components/shared/Counter'
import Logo from 'components/shared/Logo'
import {
  ModalContents,
  ModalHeader,
  useModalToggle,
} from 'components/shared/Modal'
import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { JobType, StateType } from 'types'
import { HEADING } from 'utils/status'
import JobInfo from '../JobInfo'
import JobList from '../JobList'
import styles from './JobListTable.module.scss'
type ModalIndexType = {
  index: number
  status: string
}
const JobListTable = ({ state }: { state: StateType }) => {
  const setIsModalOpen = useModalToggle()
  const [infoModal, setInfoModal] = useState<ModalIndexType>()
  const [editModal, setEditModal] = useState<ModalIndexType>()
  const handleOpenModal = (index: number, status: string) => {
    console.log({ index, status })
    if (editModal !== undefined) {
      setEditModal(undefined)
    }
    setInfoModal({ status, index })
    setIsModalOpen(true)
  }
  const handleOpenEditModal = () => {
    // console.log({ index, status })
    if (infoModal === undefined) {
      return
    }
    const infoData = infoModal
    setInfoModal(undefined)
    setEditModal({ ...infoData })
    // setIsModalOpen(true)
  }
  const getUnavailableMessage = () => {
    return 'no jobs added'
  }
  let infoModalData
  let editModalData
  if (infoModal !== undefined) {
    infoModalData = state[infoModal.status][infoModal.index]
  }
  if (editModal !== undefined) {
    editModalData = state[editModal.status][editModal.index]
  }

  const editFormButton = (
    <CircleButton
      onClick={() => {
        handleOpenEditModal()
      }}
      size={8}
    >
      <VisuallyHidden>Edit</VisuallyHidden>
      <FiEdit size={16} />
    </CircleButton>
  )

  return (
    <>
      {Object.keys(state).map((key, index) => {
        return (
          <div key={key + index} className={styles.listContainer}>
            <div className={styles.heading}>
              <span className={styles.headingIcon}>{HEADING[key]}</span>
              {key.toUpperCase()} <Counter value={state[key].length} />
            </div>
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
      {infoModalData !== undefined && (
        <ModalContents style={{ maxWidth: '520px' }} aria-label='job details'>
          <ModalHeader modalButtons={editFormButton}>
            <div className={styles.jobInfoHeader}>
              <Logo
                size={12}
                url={infoModalData.logoUrl}
                text={infoModalData.company}
              />
              <div className={styles.company}>
                <h3>{infoModalData.company}</h3>
                <div className={styles.jobTitle}>{infoModalData.jobTitle}</div>
              </div>
            </div>
          </ModalHeader>
          <JobInfo data={infoModalData} />
        </ModalContents>
      )}
      {editModalData !== undefined && (
        <ModalContents style={{ maxWidth: '520px' }} aria-label='job details'>
          <ModalHeader>
            <div className={styles.jobInfoHeader}>
              <h2>Update details</h2>
            </div>
          </ModalHeader>
          <CreateJobForm initialValue={editModalData} />
        </ModalContents>
      )}
    </>
  )
}

export default JobListTable
