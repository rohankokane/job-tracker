import React, { useReducer } from 'react'
import { StateType } from 'types/state'
import reducer from 'reducers/listReducer'
import { Action } from 'types'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const LOCAL_STORAGE_KEY: string = process.env.REACT_APP_LOCALSTORAGE_KEY!

// interface LocalStorageHook {
//   fn(
//     LOCAL_STORAGE_KEY: string,
//   reducer: Function,
//   initialState: StateType
//   ) : [StateType, React.DispatchWithoutAction]
// }

// function useLocalStorageState<R, I>(

const getInitialState = (initialStateVal: StateType): StateType => {
  const valueInLocalStorage: string | null =
    window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (valueInLocalStorage) {
    return JSON.parse(valueInLocalStorage)
  }
  return initialStateVal
}

function useLocalStorageState(
  initialState: StateType
): [StateType, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState, getInitialState)

  const prevKeyRef = React.useRef(LOCAL_STORAGE_KEY)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== LOCAL_STORAGE_KEY) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = LOCAL_STORAGE_KEY
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  }, [state, LOCAL_STORAGE_KEY])

  return [state, dispatch]
}

export default useLocalStorageState
