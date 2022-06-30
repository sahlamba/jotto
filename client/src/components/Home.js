import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants'
import { useSocketContext } from '../context/SocketContext'
import { useUserContext } from '../context/UserContext'

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

  const getGames = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/game`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const { ok, games } = await res.json()
      if (ok && games) {
        console.log(games)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getGames()
  }, [game])

  const createGame = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/game`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      })
      const { ok, game } = await res.json()
      if (ok && game) {
        setGame(game)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteGame = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/game`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: game.id }),
      })
      const { ok } = await res.json()
      if (ok) {
        setGame(null)
      }
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
      <button onClick={deleteGame}>Delete game</button>
    </React.Fragment>
  )
}

export default Home
