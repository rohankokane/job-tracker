import { Action } from 'types'
import { StateType } from 'types'

export default function reducer(state: StateType, action: Action) {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
      }
    }

    case 'UPDATE': {
      // const jobUpdate = state.find((obj: any) => obj.id === action.payload)
      // jobUpdate.status = action.payload.status
      return { ...state }
    }
    case 'DELETE': {
      // const jobDelete = state.filter((obj: any) => obj.id !== action.payload)
      return { ...state }
    }

    default: {
      return state
    }
  }
}
