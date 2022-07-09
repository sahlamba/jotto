import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'
import { useGameContext } from '../context/GameContext'
import Header from './common/Header'

const GameUI = () => {
  const navigate = useNavigate()
  const { gameCode } = useParams()

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
    if (!gameCode || gameCode === '') {
      navigate('/')
    }
    connectPlayer(gameCode)
    return () => disconnectPlayer(gameCode)
  }, [socket, gameCode])

  const updateJottoWord = (evt) => {
    evt.preventDefault()
    setJottoWord(evt.target.value)
  }

  const joinGameOnCLick = () => joinGame(game.code, player)

  const readyPlayerOnClick = (evt) => {
    evt.preventDefault()
    readyPlayer(game.code, player, jottoWord)
  }

  return (
    <React.Fragment>
      <Header player={player} socket={socket} />
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
