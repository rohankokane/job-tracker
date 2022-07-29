import { JobType } from './state'
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
  | { type: 'UPDATE'; payload: JobType & { prevStatus: string } }
  | {
      type: 'UPDATE_NOTES'
      payload: {
        status: string
        id: string
        notes: string
      }
    }
  | {
      type: 'DELETE'
      payload: {
        listId: string
        itemIndex: string
      }
    }

export type ModalAction =
  | {
      type: 'CONFIRM_DELETE'
      payload: {
        index: number
        status: string
      }
    }
  | {
      type: 'SHOW_INFO'
      payload: {
        index: number
        status: string
      }
    }
  | {
      type: 'EDIT_CANCEL'
    }
  | {
      type: 'EDIT_INFO'
    }
  | {
      type: 'EDIT_SUCCESS'
      payload: {
        isStatusChanged: boolean
        status: string
      }
    }
  | {
      type: 'CLOSE_MODAL'
    }
