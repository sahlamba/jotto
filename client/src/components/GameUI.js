import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'
import { useGameContext } from '../context/GameContext'
import WelcomeMessage from './common/welcome'

const GameUI = () => {
  const navigate = useNavigate()
  const { gameId } = useParams()

  const { player } = usePlayerContext()
  const {
    socket,
    game,
    connectPlayer,
    disconnectPlayer,
    joinGame,
    readyPlayer,
    hasPlayerJoinedGame,
    isPlayerReady,
    playerJottoWord,
  } = useGameContext()

  const [jottoWord, setJottoWord] = useState('')

  useEffect(() => {
    if (!gameId || gameId === '') {
      navigate('/')
    }
    connectPlayer(gameId)
    return () => disconnectPlayer(gameId)
  }, [socket, gameId])

  const updateJottoWord = (evt) => {
    evt.preventDefault()
    setJottoWord(evt.target.value)
  }

  const joinGameOnCLick = () => joinGame(game.id, player)

  const readyPlayerOnClick = (evt) => {
    evt.preventDefault()
    readyPlayer(game.id, player, jottoWord)
  }

  return (
    <React.Fragment>
      <WelcomeMessage player={player} socket={socket} />
      <pre>Game::{JSON.stringify(game, null, 2)}</pre>
      {!hasPlayerJoinedGame() ? (
        <button onClick={joinGameOnCLick}>Join this game</button>
      ) : null}
      {hasPlayerJoinedGame() && !isPlayerReady() ? (
        <form onSubmit={readyPlayerOnClick}>
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

export default GameUI
