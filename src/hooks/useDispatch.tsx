import { DispatchContext } from 'contexts/BoardContext'
import { useContext } from 'react'

function useDispatch() {
  const dispatch = useContext(DispatchContext)
  if (!dispatch) {
    throw new Error('useCount must be used within a ListProvider')
  }

  return dispatch
}

export { useDispatch }
