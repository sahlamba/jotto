import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from 'unique-names-generator'
import queryString from 'query-string'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import Player from '../models/Player'

const PlayerContext = createContext(null)

export const PlayerProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [player, setPlayer] = useLocalStorageState('JottoPlayer', null)
  const [randomName] = useState(
    uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: '-',
    }),
  )

  const isPlayerRegistered = () => player && player.id

  const redirectUrl = () => {
    if (location.search) {
      const query = queryString.parse(location.search)
      return query.next ? query.next : location.pathname
    }
    return location.pathname
  }

  useEffect(() => {
    if (!isPlayerRegistered()) {
      navigate(`/player?next=${redirectUrl()}`)
      return
    }
    navigate(redirectUrl())
  }, [player])

  const updateName = (event) => {
    event.preventDefault()
    setPlayer(event.target.value)
  }

  const persistPlayer = (event) => {
    event.preventDefault()
    // Transform to Player model with UUID and overwrite
    setPlayer(new Player(player && player !== '' ? player : randomName))
  }

  return (
    <PlayerContext.Provider
      value={{ player, randomName, updateName, persistPlayer }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = () => useContext(PlayerContext)
