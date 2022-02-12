import { Action } from 'types'
import { StateType } from 'types'

export default function reducer(state: StateType, action: Action) {
  console.log({ state, action })
  switch (action.type) {
    case 'ADD': {
      const dataToBeAdded = action.payload
      const { status } = dataToBeAdded
      state[status].unshift(dataToBeAdded)

      return {
        ...state,
      }
    }

    // case 'UPDATE': {
    //   // const jobUpdate = state.find((obj: any) => obj.id === action.payload)
    //   // jobUpdate.status = action.payload.status
    //   return { ...state }
    // }
    case 'DRAG_COMPLETE': {
      // update status and pop from one & add to another
      const { source, destination } = action.payload
      const item = state[source.droppableId][source.index]
      item.lastUpdated = Date.now()
      item.status = destination.droppableId
      //remove
      state[source.droppableId].splice(source.index, 1)
      //add
      state[destination.droppableId].splice(destination.index, 0, item)
      return { ...state }
    }
    case 'DELETE': {
      const { listId, itemIndex } = action.payload
      const newState = [...state[listId]]
      newState.splice(+itemIndex, 1)
      return { ...state, [listId]: [...newState] }
    }

    default: {
      return state
    }
  }
}
