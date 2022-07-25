import { Draggable } from 'react-beautiful-dnd'
import styles from './JobCard.module.scss'
import CircleButton from 'components/shared/CircleButton'
import Logo from 'components/shared/Logo'
import { timeSince } from 'utils/misc'
import { ModalAction } from 'reducers/modalReducer'
import { useModalToggle } from 'components/shared/Modal'
import { FaTrash } from 'react-icons/fa'
import React from 'react'

interface CardProps {
  index: number
  status: string
  logoUrl: string | undefined
  company: string
  jobTitle: string
  lastUpdated: number
  modalDispatch: React.Dispatch<ModalAction>
}

function JobCard({
  index,
  status,
  company,
  jobTitle,
  logoUrl,
  lastUpdated,
  modalDispatch,
}: CardProps) {
  const setIsModalOpen = useModalToggle()

  const handleClick = () => {
    setIsModalOpen(true)
    modalDispatch({ type: 'SHOW_INFO', payload: { status, index } })
  }
  const handleDelete: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation()
    setIsModalOpen(true)
    modalDispatch({ type: 'CONFIRM_DELETE', payload: { status, index } })
  }

  const id = `${lastUpdated}-${index}`
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.card} ${
            snapshot.isDragging && !snapshot.isDropAnimating ? styles.drag : ''
          }`}
          ref={provided.innerRef}
          key={index}
          onClick={handleClick}
        >
          <div className={styles.cardContainer}>
            <div className={styles.cardContent}>
              <div className={styles.cardCompany}>
                <Logo size={7.5} url={logoUrl || undefined} text={company} />
                <div className={styles.cardText}>
                  <div className={styles.companyName}>{company}</div>
                  <div className={styles.jobTitle}>{jobTitle}</div>
                </div>
              </div>
              <CircleButton
                className={styles.deleteBtn}
                aria-label='delete'
                onClick={handleDelete}
                size={6}
              >
                <FaTrash color='gray' size={12} />
              </CircleButton>
            </div>
            <div className={styles.time}>
              last updated: {timeSince(lastUpdated)}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

// export default JobCard
export default React.memo(JobCard)
