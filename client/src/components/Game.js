import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSocketContext } from '../context/SocketContext'
import { usePlayerContext } from '../context/PlayerContext'
import { getGameById, joinGame, readyPlayer } from '../utils/apiClient'
import WelcomeMessage from './common/welcome'

const Game = () => {
  const navigate = useNavigate()
  let { gameId } = useParams()

  const { socket } = useSocketContext()
  const { player } = usePlayerContext()
  const [game, setGame] = useState(null)
  const [jottoWord, setJottoWord] = useState('')

  const hasPlayerJoinedGame = () => {
    return game && game.players && game.players[player.id]
  }

  const isPlayerReady = () => {
    return hasPlayerJoinedGame() && game.players[player.id].isReady
  }

  const playerJottoWord = () => {
    return isPlayerReady() ? game.players[player.id].word : null
  }

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

  const updateJottoWord = (event) => {
    event.preventDefault()
    setJottoWord(event.target.value)
  }

  const readyPlayerAndRefreshGame = async (event) => {
    event.preventDefault()
    if (jottoWord.length > game.settings.maxWordLength) {
      console.log(`Maximum word length is ${game.settings.maxWordLength}`)
      return
    }
    try {
      const game = await readyPlayer(gameId, player, jottoWord.toUpperCase())
      setGame(game)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <WelcomeMessage player={player} socket={socket} />
      <pre>Game::{JSON.stringify(game, null, 2)}</pre>
      {!hasPlayerJoinedGame() ? (
        <button onClick={joinAndSetGame}>Join this game</button>
      ) : null}
      {hasPlayerJoinedGame() && !isPlayerReady() ? (
        <form onSubmit={readyPlayerAndRefreshGame}>
          <label htmlFor="player-jotto-word">Jotto word: </label>
          <input
            id="player-jotto-word"
            value={jottoWord ? jottoWord : ''}
            onChange={updateJottoWord}
            type="text"
          />
          <button type="submit">Ready</button>
        </form>
      ) : null}
      {isPlayerReady() ? (
        <p>Player ready with word: {playerJottoWord()}</p>
      ) : null}
    </React.Fragment>
  )
}

export default Game
