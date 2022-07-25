import VisuallyHidden from '@reach/visually-hidden'
import CreateJobForm from 'components/form/CreateJobForm'
import List from 'components/list'
import Button from 'components/shared/Button'
import CircleButton from 'components/shared/CircleButton'
import Counter from 'components/shared/Counter'
import Logo from 'components/shared/Logo'
import {
  ModalContents,
  ModalHeader,
  useModalToggle,
} from 'components/shared/Modal'
import { useDispatch } from 'hooks/useDispatch'
import { useReducer, useState } from 'react'
import {
  FiEdit,
  FiMaximize,
  FiMinimize,
  FiTrash,
} from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'
import modalReducer from 'reducers/modalReducer'
import { StateType } from 'types'
import { HEADING } from 'utils/status'
import JobInfo from '../JobInfo'
import JobList from '../JobList'
import styles from './JobListTable.module.scss'

type emptyList = {
  [k: string]: string
}
const emptyListMessage: emptyList = {
  saved: 'Click the add button above, to save a new job',
  applied: 'Start applying asap!',
  interview: 'Be patient',
  offer: 'You are almost there',
  rejected: `It's a part of the process`,
}
const MODAL_SIZE_LARGE = 1400
const MODAL_SIZE_SMALL = 520

const JobListTable = ({ state }: { state: StateType }) => {
  const [infoModalSize, setInfoModalSize] = useState(MODAL_SIZE_SMALL)
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    modalToShow: 'NONE',
  })
  const setIsModalOpen = useModalToggle()
  const dispatch = useDispatch()

  const deleteJob = () => {
    if (modalState.modalToShow === 'NONE') return

    dispatch({
      type: 'DELETE',
      payload: {
        listId: modalState.status,
        itemIndex: '' + modalState.index,
      },
    })
    closeModal()
  }
  const closeModal = () => {
    setIsModalOpen(false)
    modalDispatch({ type: 'CLOSE_MODAL' })
  }

  let modalData
  if (modalState.modalToShow !== 'NONE') {
    modalData = state[modalState.status][modalState.index]
  }

  const infoModalButtons = (
    <>
      <CircleButton
        onClick={() => {
          setInfoModalSize((prevState) => {
            if (prevState === MODAL_SIZE_LARGE) return MODAL_SIZE_SMALL
            return MODAL_SIZE_LARGE
          })
        }}
        size={8}
        aria-label={
          infoModalSize === MODAL_SIZE_SMALL ? 'Maximize' : 'Minimize'
        }
      >
        <VisuallyHidden>
          {infoModalSize === MODAL_SIZE_SMALL ? 'Maximize' : 'Minimize'}
        </VisuallyHidden>
        {infoModalSize === MODAL_SIZE_SMALL ? (
          <FiMaximize size={16} />
        ) : (
          <FiMinimize size={16} />
        )}
      </CircleButton>
      <CircleButton
        onClick={() => {
          modalDispatch({ type: 'EDIT_INFO' })
        }}
        size={8}
        aria-label='edit'
      >
        <VisuallyHidden>Edit</VisuallyHidden>
        <FiEdit size={16} />
      </CircleButton>
      <CircleButton
        onClick={() => {
          if (modalState.modalToShow === 'NONE') return
          modalDispatch({
            type: 'CONFIRM_DELETE',
            payload: { index: modalState.index, status: modalState.status },
          })
        }}
        size={8}
        aria-label='delete'
      >
        <FiTrash size={16} />
      </CircleButton>
    </>
  )

  return (
    <>
      {Object.keys(state).map((key, index) => {
        return (
          <div key={key + index} className={styles.listContainer}>
            <div className={styles.heading}>
              <span className={styles.headingIcon}>{HEADING[key]}</span>
              {key} <Counter value={state[key].length} />
            </div>
            <List key={key + index} dropId={key}>
              {state[key].length ? (
                <JobList
                  modalDispatch={modalDispatch}
                  list={state[key]}
                  key={key}
                  keyTitle={key}
                />
              ) : (
                <span className={styles.unavailable} aria-hidden='true'>
                  {emptyListMessage[key]}
                </span>
              )}
            </List>
          </div>
        )
      })}
      {modalState.modalToShow === 'INFO' && modalData !== undefined && (
        <ModalContents
          style={{
            maxWidth: `${infoModalSize}px`,
            paddingTop: '1.2rem',
            transitionProperty: 'max-width',
            transitionDuration: ' 500ms',
          }}
          aria-label='job details'
        >
          <ModalHeader modalButtons={infoModalButtons}>
            <div className={styles.jobInfoHeader}>
              <Logo
                size={12}
                url={modalData.companyData.logo}
                text={modalData.company}
              />
              <div className={styles.company}>
                <h3>{modalData.company}</h3>
                <div className={styles.jobTitle}>{modalData.jobTitle}</div>
              </div>
            </div>
          </ModalHeader>
          <JobInfo data={modalData} />
        </ModalContents>
      )}
      {modalState.modalToShow === 'EDIT' && modalData !== undefined && (
        <ModalContents
          style={{ maxWidth: '520px' }}
          aria-label='update job details'
        >
          <ModalHeader>
            <div className={styles.jobInfoHeader}>
              <h2>Update details</h2>
            </div>
          </ModalHeader>
          <CreateJobForm
            initialValue={modalData}
            modalDispatch={modalDispatch}
          />
        </ModalContents>
      )}
      {modalState.modalToShow === 'DELETE' && modalData !== undefined && (
        <ModalContents
          style={{ maxWidth: '460px', padding: '1rem 1.5rem' }}
          aria-label='Delete confirmation dialog'
        >
          <ModalHeader>
            <h3 style={{ textAlign: 'left', fontSize: '1.5em' }}>
              Confirmation
            </h3>
          </ModalHeader>
          <p>
            Are you sure you want to delete{' '}
            <b>
              {modalData.company} - {modalData.jobTitle}{' '}
            </b>
            record?
          </p>
          <div className={styles.modalFooter}>
            <Button variant='secondary' onClick={closeModal}>
              Cancel
            </Button>
            <Button variant='danger' onClick={deleteJob}>
              <FaTrash size={16} style={{ margin: '0 0.4rem 0 0' }} />
              Delete
            </Button>
          </div>
        </ModalContents>
      )}
    </>
  )
}

export default JobListTable
