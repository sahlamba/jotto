import React from 'react'

import { GameProvider } from '../../context/GameContext'

import GameUI from './GameUI'

const Game = () => {
  return (
    <GameProvider>
      <GameUI />
    </GameProvider>
  )
}

export default Game
