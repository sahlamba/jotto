import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../constants'
import { useSocketContext } from '../context/SocketContext'
import { useUserContext } from '../context/UserContext'

const Game = () => {
  const navigate = useNavigate()
  let { gameId } = useParams()

  const { socket } = useSocketContext()
  const { user } = useUserContext()
  const [game, setGame] = useState(null)

  useEffect(() => {
    console.log('mount')
    console.log('user', user)
    if (!user || !user.id) {
      console.log('navigating to user')
      navigate('/user?next=/')
    }
    console.log('gameId', gameId)
    if (!gameId) {
      console.log('navigating')
      navigate('/')
    }
    getGame()
  }, [])

  const getGame = async () => {
    try {
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
    if (socket) {
      if (gameId) {
        socket.emit('join_game', { user, gameId })
      }
      return () => {
        socket.emit('leave_game', { user, gameId })
      }
    }
  }, [socket, user, gameId])

  return (
    <React.Fragment>
      <h1>Welcome to Jotto, {user ? user.name : 'user not registered'}!</h1>
      {socket ? <pre>Connected with socket ID: {socket.id}</pre> : null}
      <pre>Game ID: {gameId}</pre>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </React.Fragment>
  )
}

export default Game
