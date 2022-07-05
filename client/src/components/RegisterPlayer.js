import React from 'react'
import { usePlayerContext } from '../context/PlayerContext'

const RegisterPlayer = () => {
  const { player, randomName, updateName, persistPlayer } = usePlayerContext()

  return (
    <React.Fragment>
      <form onSubmit={persistPlayer}>
        <label htmlFor="player-name">Jotto player name: </label>
        <input
          id="player-name"
          placeholder={randomName}
          value={player ? player : ''}
          onChange={updateName}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  )
}

export default RegisterPlayer
