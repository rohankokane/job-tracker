import { Droppable } from 'react-beautiful-dnd'
import styles from './List.module.scss'

function List({
  dropId,
  children,
}: {
  dropId: string
  children: React.ReactNode
}) {
  return (
    // <div className={styles.}>
    <Droppable droppableId={dropId}>
      {(provided, snapshot) => (
        <div
          className={`${styles.list} ${
            snapshot.isDraggingOver ? styles.dragactive : ''
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    // </div>
  )
}

export default List
