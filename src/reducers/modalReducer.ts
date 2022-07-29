import { ModalAction, ModalState } from 'types'

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
