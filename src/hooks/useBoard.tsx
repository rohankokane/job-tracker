import { BoardContext } from 'contexts/BoardContext'
import { useContext } from 'react'

function useBoard() {
  const state = useContext(BoardContext)
  if (!state) {
    throw new Error('useCount must be used within a ListProvider')
  }

  return state
}

export { useBoard }
