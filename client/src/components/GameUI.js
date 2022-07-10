import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'
import { useGameContext } from '../context/GameContext'
import Header from './common/Header'
import GameDetails from './GameDetails'
import JottoWordInput from './JottoWordInput'
import { Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const GameContent = () => {
  const { player } = usePlayerContext()
  const {
    game,
    loadingGame,
    joinGame,
    joiningGame,
    readyPlayer,
    readyingPlayer,
    hasPlayerJoinedGame,
  } = useGameContext()

  if (!loadingGame.status && !game) {
    return (
      <Flex my={8} align="center" justifyContent="center">
        No game found!
      </Flex>
    )
  }

  const joinGameOnCLick = () => joinGame(game.code, player)

  const readyPlayerOnSubmit = ({ jottoWord }) => {
    readyPlayer(game.code, player, jottoWord)
  }

  return (
    <React.Fragment>
      <GameDetails game={game} />
      {!hasPlayerJoinedGame() ? (
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
      ) : null}
      <JottoWordInput
        onSubmit={readyPlayerOnSubmit}
        isLoading={readyingPlayer}
      />
    </React.Fragment>
  )
}

const GameUI = () => {
  const navigate = useNavigate()
  const { gameCode } = useParams()

  const { player, verifyPlayerOrRedirect } = usePlayerContext()
  const { socket, loadingGame, connectPlayer, disconnectPlayer } =
    useGameContext()

  useEffect(() => {
    verifyPlayerOrRedirect()
  }, [])

  useEffect(() => {
    if (!gameCode || gameCode === '') {
      navigate('/')
    }
    connectPlayer(gameCode)
    return () => disconnectPlayer(gameCode)
  }, [socket, gameCode])

  return (
    <React.Fragment>
      <Header player={player} socket={socket} />
      {loadingGame.status ? (
        <Flex my={8} align="center" justifyContent="center">
          <Text>{loadingGame.message}</Text>
          <Spinner ml={2} />
        </Flex>
      ) : (
        <GameContent />
      )}
    </React.Fragment>
  )
}

export default GameUI
