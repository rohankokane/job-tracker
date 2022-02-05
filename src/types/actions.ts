import { DraggableLocation } from 'react-beautiful-dnd'
import { StateType } from './state'

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
