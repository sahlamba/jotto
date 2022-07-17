import React from 'react'
import { Button } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import { useGameContext } from '../../../context/GameContext'

const StartGameButton = () => {
  const { startGame, startingGame } = useGameContext()

  const startGameOnClick = () => startGame()
  return (
    <Button
      colorScheme="green"
      variant="solid"
      rightIcon={<CheckIcon />}
      onClick={startGameOnClick}
      isLoading={startingGame}>
      Start game
    </Button>
  )
}

export default StartGameButton
