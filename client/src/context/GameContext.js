import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { API_BASE_URL } from '../constants'
import { getGameById } from '../utils/apiClient'
import { usePlayerContext } from './PlayerContext'

const GameContext = createContext(null)

export const GameProvider = ({ children }) => {
  const { player } = usePlayerContext()

  const [socket, setSocket] = useState(null)
  const [game, setGame] = useState(null)

  const getAndSetGame = async (gameCode) => {
    try {
      const game = await getGameById(gameCode)
      setGame(game)
    } catch (error) {
      console.error(error)
    }
  }

  const connectPlayer = (gameCode) => {
    if (socket && gameCode) {
      socket.emit('connect_player', { gameCode, player }, () => {
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
      socket.emit('join_game', { gameCode, player })
    }
  }

  const readyPlayer = (gameCode, player, jottoWord) => {
    if (jottoWord.length > game.settings.maxWordLength) {
      console.error(`Maximum word length is ${game.settings.maxWordLength}`)
      return
    }
    if (socket && gameCode) {
      socket.emit('ready_player', { gameCode, player, jottoWord })
    }
  }

  const hasPlayerJoinedGame = () => {
    return game && game.players && game.players[player.id]
  }

  const isPlayerReady = () => {
    return hasPlayerJoinedGame() && game.players[player.id].isReady
  }

  const playerJottoWord = () => {
    return isPlayerReady() ? game.players[player.id].word : null
  }

  useEffect(() => {
    const socketListener = io(API_BASE_URL)

    socketListener.on('connect', () => {
      setSocket(socketListener)
    })

    socketListener.on('disconnect', () => {
      setSocket(null)
    })

    socketListener.on('join_game_error', (error) => {
      console.error(`${error.name}: ${error.message}`)
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
        connectPlayer,
        disconnectPlayer,
        joinGame,
        readyPlayer,
        hasPlayerJoinedGame,
        isPlayerReady,
        playerJottoWord,
      }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
