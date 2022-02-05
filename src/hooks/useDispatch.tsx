import { DispatchContext } from 'contexts/BoardContext'
import { useContext } from 'react'

function useDispatch() {
  const dispatch = useContext(DispatchContext)
  if (!dispatch) {
    throw new Error('useDispatch must be used within a DispatchProvider')
  }

  return dispatch
}

export { useDispatch }
