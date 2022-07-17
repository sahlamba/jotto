import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Flex, Spinner, Text } from '@chakra-ui/react'

import { usePlayerContext } from '../../context/PlayerContext'
import { useGameContext } from '../../context/GameContext'

import Header from '../Header'
import GameContent from './GameContent'

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
      <Header player={player} />
      {loadingGame.status ? (
        <Flex my={8} alignItems="center" justifyContent="center">
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
