import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants'
import { useSocketContext } from '../context/SocketContext'
import { useUserContext } from '../context/UserContext'
import GameSettings from '../models/GameSettings'

const Home = () => {
  const navigate = useNavigate()
  const { socket } = useSocketContext()
  const { user } = useUserContext()
  const [game, setGame] = useState(null)

  useEffect(() => {
    if (!user || !user.id) {
      navigate('/user?next=/')
    }
  }, [])

  const createGame = async () => {
    try {
      const settings = new GameSettings(2, 4)

      const res = await fetch(`${API_BASE_URL}/api/game`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, settings }),
      })
      const { ok, game, message } = await res.json()
      if (!ok) {
        console.error(message)
        return
      }
      setGame(game)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <h1>Welcome to Jotto, {user ? user.name : 'user not registered'}!</h1>
      {socket ? <pre>Connected with socket ID: {socket.id}</pre> : null}
      <button onClick={createGame}>Create game</button>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </React.Fragment>
  )
}

export default Home
