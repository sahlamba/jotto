import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import { usePlayerContext } from '../../context/PlayerContext'
import { useGameContext } from '../../context/GameContext'

import JottoWordInput from './JottoWordInput'

const GameCreatedUI = () => {
  const { player } = usePlayerContext()
  const {
    game,
    joinGame,
    joiningGame,
    readyPlayer,
    readyingPlayer,
    hasPlayerJoinedGame,
  } = useGameContext()

  const joinGameOnCLick = () => joinGame(game.code, player)

  const readyPlayerOnSubmit = ({ jottoWord }) => {
    readyPlayer(game.code, player, jottoWord)
  }

  return (
    <React.Fragment>
      {!hasPlayerJoinedGame(player) ? (
        <Flex align="center" justifyContent="center">
          <Button
            colorScheme="purple"
            variant="solid"
            rightIcon={<CheckIcon />}
            onClick={joinGameOnCLick}
            isLoading={joiningGame}>
            Join this game
          </Button>
        </Flex>
      ) : (
        <JottoWordInput
          onSubmit={readyPlayerOnSubmit}
          isLoading={readyingPlayer}
        />
      )}
    </React.Fragment>
  )
}

export default GameCreatedUI
