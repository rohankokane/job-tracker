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
type ModalState =
  | { index: number; status: string; modalToShow: 'EDIT' | 'INFO' | 'DELETE' }
  | { modalToShow: 'NONE' }

export default function modalReducer(
  state: ModalState,
  action: ModalAction
): ModalState {
  switch (action.type) {
    case 'SHOW_INFO': {
      const { index, status } = action.payload
      return { modalToShow: 'INFO', index, status }
    }
    case 'EDIT_CANCEL': {
      if (state.modalToShow === 'NONE') return state

      return { ...state, modalToShow: 'INFO' }
    }
    case 'EDIT_INFO': {
      if (state.modalToShow === 'NONE') return state

      // const { index, status } = action.payload
      return { ...state, modalToShow: 'EDIT' }
    }
    case 'CONFIRM_DELETE': {
      const { index, status } = action.payload
      return { modalToShow: 'DELETE', index, status }
    }
    case 'CLOSE_MODAL': {
      return { modalToShow: 'NONE' }
    }
    case 'EDIT_SUCCESS': {
      if (state.modalToShow === 'NONE') return state

      const { isStatusChanged, status } = action.payload
      if (isStatusChanged) {
        return { modalToShow: 'INFO', status, index: 0 }
      }
      return { ...state, modalToShow: 'INFO' }
    }

    default: {
      return state
    }
  }
}
