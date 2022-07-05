import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'
import GameSettings from '../models/GameSettings'
import { createGame, getPlayerGamesById } from '../utils/apiClient'

const Home = () => {
  const navigate = useNavigate()

  const { player } = usePlayerContext()
  const [playerGameIdMappings, setPlayerGameIdMappings] = useState([])

  const getAndSetPlayerGames = async () => {
    try {
      if (!player) {
        return
      }
      const res = await getPlayerGamesById(player.id)
      setPlayerGameIdMappings(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAndSetPlayerGames()
  }, [])

  const createGameOnClick = async () => {
    try {
      const game = await createGame(player, new GameSettings(2, 4))
      navigate(`/game/${game.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <h1>
        Welcome to Jotto, {player ? player.name : 'player not registered'}!
      </h1>
      <button onClick={createGameOnClick}>Create game</button>
      <p>Current joined games:</p>
      <ol>
        {playerGameIdMappings.map(({ gameId }) => (
          <li key={gameId}>
            <Link to={`/game/${gameId}`}>{gameId}</Link>
          </li>
        ))}
      </ol>
    </React.Fragment>
  )
}

export default Home
