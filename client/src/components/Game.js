import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSocketContext } from '../context/SocketContext'
import { usePlayerContext } from '../context/PlayerContext'
import { getGameById, joinGame } from '../utils/apiClient'

const Game = () => {
  const navigate = useNavigate()
  let { gameId } = useParams()

  const { socket } = useSocketContext()
  const { player } = usePlayerContext()
  const [game, setGame] = useState(null)

  const getAndSetGame = async () => {
    try {
      const game = await getGameById(gameId)
      setGame(game)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!gameId || gameId === '') {
      navigate('/')
    }
    getAndSetGame()
  }, [])

  const joinAndSetGame = async () => {
    try {
      const game = await joinGame(gameId, player)
      setGame(game)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <h1>
        Welcome to Jotto, {player ? player.name : 'player not registered'}!
      </h1>
      {socket ? <pre>Connected with socket ID: {socket.id}</pre> : null}
      <pre>Game ID: {gameId}</pre>
      <pre>{JSON.stringify(game, null, 2)}</pre>
      <button onClick={joinAndSetGame}>Join this game</button>
    </React.Fragment>
  )
}

export default Game
