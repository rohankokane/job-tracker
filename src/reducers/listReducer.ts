import { Action, JobType } from 'types'
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

    case 'UPDATE': {
      const data = action.payload
      console.log({ data }, 'REDUCER')
      const { status, prevStatus, ...restObj } = data

      const indexToUpdate = state[prevStatus].findIndex(
        ({ id }) => id === data.id
      )
      if (indexToUpdate === -1) return { ...state }

      const updatedObj = { ...restObj, status }
      // remove
      state[prevStatus].splice(indexToUpdate, 1)
      //add at the start
      state[status].unshift(updatedObj)

      return { ...state }
    }

    case 'UPDATE_NOTES': {
      const { status, id, notes } = action.payload

      const indexToUpdate = state[status].findIndex(({ id: _id }) => _id === id)
      if (indexToUpdate === -1) return { ...state }

      const updatedObj = {
        ...state[status][indexToUpdate],
        notes,
        lastUpdated: Date.now(),
      }

      // remove
      state[status].splice(indexToUpdate, 1)
      //add at the start
      state[status].unshift(updatedObj)

      return { ...state }
    }

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
