import { createContext } from 'react'
import useLocalStorageState from 'hooks/useLocalStorage'
import { Action, StateType } from 'types'
import { InitialState } from 'utils/mockData'

type DispatchType = React.Dispatch<Action>

export const BoardContext = createContext<StateType>(InitialState)
export const DispatchContext = createContext<DispatchType>(
  null as unknown as DispatchType
)

export default function BoardProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useLocalStorageState(InitialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <BoardContext.Provider value={state}>{children}</BoardContext.Provider>
    </DispatchContext.Provider>
  )
}
