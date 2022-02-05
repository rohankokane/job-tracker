import { BoardContext } from 'contexts/BoardContext'
import { useContext } from 'react'

function useBoard() {
  const state = useContext(BoardContext)
  if (!state) {
    throw new Error('useBoard must be used within a BoardProvider')
  }

  return state
}

export { useBoard }
