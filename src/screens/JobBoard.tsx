import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import List from 'components/lists/List'
import styles from './JobBoard.module.scss'
import JobCard from 'components/board/JobCard'
function JobBoard() {
  const onDragEnd = (result: DropResult) => {
    console.log({ result })
    // const { destination, source } = result;

    // console.log(result);

    // if (!destination) {
    //   return;
    // }

    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }

    // let add;
    // let active = todos;
    // let complete = CompletedTodos;
    // // Source Logic
    // if (source.droppableId === "TodosList") {
    //   add = active[source.index];
    //   active.splice(source.index, 1);
    // } else {
    //   add = complete[source.index];
    //   complete.splice(source.index, 1);
    // }

    // // Destination Logic
    // if (destination.droppableId === "TodosList") {
    //   active.splice(destination.index, 0, add);
    // } else {
    //   complete.splice(destination.index, 0, add);
    // }

    // setCompletedTodos(complete);
    // setTodos(active);
  }

  return (
    <div className={styles.grid}>
      <DragDropContext onDragEnd={onDragEnd}>
        <List dropId={'active'}>
          <>
            <span className={styles.heading}>Active Tasks</span>
            <JobCard id='1' index={1} />
          </>
        </List>
        <List dropId={'notactive'}>
          <>
            <span className={styles.heading}>Inactive Tasks</span>
            <JobCard id='2' index={2} />
          </>
        </List>
      </DragDropContext>
    </div>
  )
}

export default JobBoard
