import { Draggable } from 'react-beautiful-dnd'
import { JobType } from 'types'
import styles from './JobCard.module.scss'
import { FiTrash } from 'react-icons/fi'
import { useDispatch } from 'hooks/useDispatch'
import CircleButton from 'components/shared/CircleButton'
import Logo from 'components/shared/Logo'

interface CardProps {
  id: string
  index: number
  jobData: JobType
  onClick: (index: number, status: string) => void
}
function JobCard({ id, index, jobData, onClick }: CardProps) {
  const dispatch = useDispatch()
  const onDelete = () => {
    const [listId, itemIndex] = id.split('-')
    console.log('delete ', listId, itemIndex)
    dispatch({
      type: 'DELETE',
      payload: {
        listId,
        itemIndex,
      },
    })
  }
  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    // console.log('clicked', index, jobData)
    onClick(index, jobData.status)
  }

  return (
    <Draggable draggableId={id.toString()} index={index}>
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
          <div className={styles.cardContent}>
            <div className={styles.cardCompany}>
              <Logo url={jobData?.logoUrl} text={jobData.company} />
              <div className={styles.cardText}>
                <div className={styles.companyName}>{jobData.company}</div>
                <div className={styles.jobTitle}>{jobData.jobTitle}</div>
              </div>
            </div>
            <CircleButton
              className={styles.deleteBtn}
              aria-label='delete'
              onClick={onDelete}
              size={6}
            >
              <FiTrash size={13} />
            </CircleButton>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default JobCard
