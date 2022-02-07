import { Draggable } from 'react-beautiful-dnd'
import { JobType } from 'types'
import styles from './JobCard.module.scss'
import { FiTrash } from 'react-icons/fi'
import IconButton from 'components/shared/IconButton'
import { useDispatch } from 'hooks/useDispatch'
import CircleButton from 'components/shared/CircleButton'

interface CardProps {
  id: string
  index: number
  jobData: JobType
}
function JobCard({ id, index, jobData }: CardProps) {
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
  // let isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
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
        >
          <div className={styles.cardContent}>
            {jobData.company} - {jobData.title}
            <CircleButton
              className={styles.deleteBtn}
              aria-label='delete'
              onClick={onDelete}
            >
              <FiTrash />
            </CircleButton>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default JobCard
