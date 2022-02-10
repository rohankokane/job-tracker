import { JobType, StateType } from './state'
import { DraggableLocation } from 'react-beautiful-dnd'

export type Action =
  | {
      type: 'ADD'
      payload: StateType
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
