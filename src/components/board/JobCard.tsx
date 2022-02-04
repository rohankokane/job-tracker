import { Draggable } from 'react-beautiful-dnd'
import styles from './JobCard.module.scss'
interface CardProps {
  id: string
  index: number
}
function JobCard({ id, index }: CardProps) {
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
          <div className={styles.cardContent}>JobCard</div>
        </div>
      )}
    </Draggable>
  )
}

export default JobCard
