import React from 'react'

import { useGameContext } from '../../../context/GameContext'

import JottoWordInput from './JottoWordInput'

const PlayerJoinedNotReady = () => {
  const { readyPlayer, readyingPlayer } = useGameContext()

  const readyPlayerOnSubmit = ({ jottoWord }) => {
    readyPlayer(jottoWord)
  }

  return (
    <JottoWordInput onSubmit={readyPlayerOnSubmit} isLoading={readyingPlayer} />
  )
}

export default PlayerJoinedNotReady
