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
  id: string
  status: string
}
const JobListTable = ({ state }: { state: StateType }) => {
  const setIsModalOpen = useModalToggle()
  const [infoModal, setInfoModal] = useState<ModalIndexType>()
  const [updateModal, setUpdateModal] = useState<ModalIndexType>()
  const handleOpenModal = (id: string, status: string) => {
    if (updateModal !== undefined) {
      setUpdateModal(undefined)
    }
    setInfoModal({ status, id })
    setIsModalOpen(true)
  }
  const handleOpenUpdateModal = () => {
    // console.log({ index, status })
    if (infoModal === undefined) {
      return
    }
    const infoData = infoModal
    setInfoModal(undefined)
    setUpdateModal({ ...infoData })
  }
  const handleUpdateData = () => {
    if (updateModal === undefined) {
      return
    }

    const updateData = updateModal
    setUpdateModal(undefined)
    setInfoModal({ ...updateData })
  }
  const getUnavailableMessage = () => {
    return 'no jobs added'
  }

  let infoModalData
  let updateModalData
  if (infoModal !== undefined) {
    infoModalData = state[infoModal.status].find(
      ({ id }) => id === infoModal.id
    )
    // [infoModal.index]
  }
  if (updateModal !== undefined) {
    updateModalData = state[updateModal.status].find(
      ({ id }) => id === updateModal.id
    )
  }

  const editFormButton = (
    <CircleButton
      onClick={() => {
        handleOpenUpdateModal()
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
      {updateModalData !== undefined && (
        <ModalContents style={{ maxWidth: '520px' }} aria-label='job details'>
          <ModalHeader>
            <div className={styles.jobInfoHeader}>
              <h2>Update details</h2>
            </div>
          </ModalHeader>
          <CreateJobForm
            initialValue={updateModalData}
            onUpdateData={handleUpdateData}
          />
        </ModalContents>
      )}
    </>
  )
}

export default JobListTable
