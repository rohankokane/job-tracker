import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import styles from './JobBoard.module.scss'
import { useBoard } from 'hooks/useBoard'
import { useDispatch } from 'hooks/useDispatch'
import { useEffect } from 'react'
import { mockData } from 'reducers/mockData'
import JobListTable from 'components/board/JobListTable'

function JobBoard() {
  const state = useBoard()
  const dispatch = useDispatch()

  const onDragEnd = (result: DropResult) => {
    console.log({ result })
    const { destination, source } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    if (destination !== undefined) {
      dispatch({ type: 'DRAG_COMPLETE', payload: { source, destination } })
    } else {
      return
    }
  }

  return (
    <div className={styles.grid}>
      <DragDropContext onDragEnd={onDragEnd}>
        <JobListTable state={state} />
      </DragDropContext>
    </div>
  )
}

export default JobBoard
