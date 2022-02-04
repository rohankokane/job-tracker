import useLocalStorageState from 'hooks/useLocalStorage'
import { createContext } from 'react'
import { Action } from 'types'
import { StateType } from 'types/state'

const initialState = {
  saved: [],
  applied: [],
  interview: [],
  offer: [],
  rejected: [],
}

type DispatchType = React.Dispatch<Action>

export const BoardContext = createContext<StateType>(initialState)
export const DispatchContext = createContext<DispatchType>(
  null as unknown as DispatchType
)

export default function BoardProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useLocalStorageState(initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <BoardContext.Provider value={state}>{children}</BoardContext.Provider>
    </DispatchContext.Provider>
  )
}
