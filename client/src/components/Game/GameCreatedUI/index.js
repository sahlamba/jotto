import React from 'react'

import { useGameContext } from '../../../context/GameContext'

import PlayerNotJoined from './PlayerNotJoined'
import PlayerJoinedNotReady from './PlayerJoinedNotReady'
import PlayerReady from './PlayerReady'

const GameCreatedUI = () => {
  const { hasPlayerJoinedGame, isPlayerReady } = useGameContext()

  return (
    <React.Fragment>
      {!hasPlayerJoinedGame() && <PlayerNotJoined />}
      {hasPlayerJoinedGame() && !isPlayerReady() && <PlayerJoinedNotReady />}
      {hasPlayerJoinedGame() && isPlayerReady() && <PlayerReady />}
    </React.Fragment>
  )
}

export default GameCreatedUI
