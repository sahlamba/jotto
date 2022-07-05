import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../constants'
import { useSocketContext } from '../context/SocketContext'
import { usePlayerContext } from '../context/PlayerContext'

const Game = () => {
  const navigate = useNavigate()
  let { gameId } = useParams()

  const { socket } = useSocketContext()
  const { player } = usePlayerContext()
  const [game, setGame] = useState(null)

  const getGame = async () => {
    try {
      if (!gameId) {
        return
      }
      const res = await fetch(`${API_BASE_URL}/api/game?id=${gameId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const { ok, game, message } = await res.json()
      setGame(() => {
        if (!ok) {
          console.error(message)
          return null
        }
        return game
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!gameId || gameId === '') {
      navigate('/')
    }
    getGame()
  }, [])

  useEffect(() => {
    if (socket) {
      if (gameId) {
        socket.emit('join_game', { player, gameId })
      }
      return () => {
        socket.emit('leave_game', { player, gameId })
      }
    }
  }, [socket, player, gameId])

  return (
    <React.Fragment>
      <h1>
        Welcome to Jotto, {player ? player.name : 'player not registered'}!
      </h1>
      {socket ? <pre>Connected with socket ID: {socket.id}</pre> : null}
      <pre>Game ID: {gameId}</pre>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </React.Fragment>
  )
}

export default Game
