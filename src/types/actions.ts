import { DraggableLocation, DragUpdate, DropResult } from 'react-beautiful-dnd'
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
  | { type: 'DELETE' }
