import { JobType, StateType } from './state'
import { DraggableLocation } from 'react-beautiful-dnd'

export type Action =
  | {
      type: 'ADD'
      payload: JobType
    }
  | {
      type: 'DRAG_COMPLETE'
      payload: {
        source: DraggableLocation
        destination: DraggableLocation
      }
    }
  | { type: 'UPDATE' }
  | {
      type: 'DELETE'
      payload: {
        listId: string
        itemIndex: string
      }
    }
