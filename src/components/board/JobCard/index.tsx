import { Draggable } from 'react-beautiful-dnd'
import { JobType } from 'types'
import styles from './JobCard.module.scss'
import { FiTrash } from 'react-icons/fi'
import { useDispatch } from 'hooks/useDispatch'
import CircleButton from 'components/shared/CircleButton'
import Logo from 'components/shared/Logo'
import { timeSince } from 'utils/misc'
import { ModalAction } from 'reducers/modalReducer'
import { useModalToggle } from 'components/shared/Modal'
import { FaTrash, FaTrashAlt } from 'react-icons/fa'

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
  // const dispatch = useDispatch()
  const setIsModalOpen = useModalToggle()

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    setIsModalOpen(true)
    modalDispatch({ type: 'SHOW_INFO', payload: { status, index } })
  }
  const onDelete: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation()
    setIsModalOpen(true)
    modalDispatch({ type: 'CONFIRM_DELETE', payload: { status, index } })
    // dispatch({
    //   type: 'DELETE',
    //   payload: {
    //     listId,
    //     itemIndex,
    //   },
    // })
  }

  const id = `${status}-${index.toString()}`
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
                onClick={onDelete}
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

export default JobCard
