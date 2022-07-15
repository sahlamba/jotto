import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useToast } from '@chakra-ui/react'

import { API_BASE_URL } from '../constants'
import { usePlayerContext } from './PlayerContext'

import { getGameById } from '../utils/apiClient'
import { notify } from '../utils/ui'

const GameContext = createContext(null)

export const GameProvider = ({ children }) => {
  const { player } = usePlayerContext()

  const [socket, setSocket] = useState(null)
  const [game, setGame] = useState(null)
  const [loadingGame, setLoadingGame] = useState({
    status: true,
    message: '',
  })
  const [joiningGame, setJoiningGame] = useState(false)
  const [readyingPlayer, setReadyingPlayer] = useState(false)

  const toast = useToast()

  const getAndSetGame = async (gameCode) => {
    setLoadingGame({ status: true, message: 'Loading game' })
    try {
      const game = await getGameById(gameCode)
      setGame(game)
    } catch (error) {
      notify(toast, { title: error, status: 'error' })
    }
    setLoadingGame({ status: false, message: '' })
  }

  const connectPlayer = (gameCode) => {
    if (socket && gameCode) {
      setLoadingGame({ status: true, message: 'Connecting player' })
      socket.emit('connect_player', { gameCode, player }, (err) => {
        setLoadingGame({ status: false, message: '' })
        if (err) {
          notify(toast, { title: err.message, status: 'error' })
          return
        }
        getAndSetGame(gameCode)
      })
    }
  }

  const disconnectPlayer = (gameCode) => {
    if (socket && gameCode) {
      socket.emit('disconnect_player', { gameCode, player })
    }
  }

  const joinGame = (gameCode, player) => {
    if (socket && gameCode) {
      setJoiningGame(true)
      socket.emit('join_game', { gameCode, player }, (err) => {
        setJoiningGame(false)
        if (err) {
          notify(toast, { title: err.message, status: 'error' })
        }
      })
    }
  }

  const readyPlayer = (gameCode, player, jottoWord) => {
    if (jottoWord.length > game.settings.maxWordLength) {
      notify(toast, {
        title: `Maximum word length is ${game.settings.maxWordLength}`,
        status: 'error',
      })
      return
    }
    if (socket && gameCode) {
      setReadyingPlayer(true)
      socket.emit('ready_player', { gameCode, player, jottoWord }, (err) => {
        setReadyingPlayer(false)
        if (err) {
          notify(toast, { title: err.message, status: 'error' })
        }
      })
    }
  }

  const hasPlayerJoinedGame = (player) => {
    return player && game && game.players && game.players[player.id]
  }

  const isPlayerReady = (player) => {
    return (
      player && hasPlayerJoinedGame(player) && game.players[player.id].isReady
    )
  }

  const playerJottoWord = (player) => {
    return player && isPlayerReady(player) ? game.players[player.id].word : null
  }

  useEffect(() => {
    const socketListener = io(API_BASE_URL)

    socketListener.on('connect', () => {
      setSocket(socketListener)
    })

    socketListener.on('disconnect', () => {
      setSocket(null)
    })

    socketListener.on('player_joined_game', ({ gameState }) => {
      setGame(gameState)
    })

    socketListener.on('player_ready_in_game', ({ gameState }) => {
      setGame(gameState)
    })

    return () => socketListener.disconnect()
  }, [])

  return (
    <GameContext.Provider
      value={{
        socket,
        game,
        loadingGame,
        connectPlayer,
        disconnectPlayer,
        joinGame,
        joiningGame,
        readyPlayer,
        readyingPlayer,
        hasPlayerJoinedGame,
        isPlayerReady,
        playerJottoWord,
        notify,
      }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
