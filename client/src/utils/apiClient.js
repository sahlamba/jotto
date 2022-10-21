import { API_BASE_URL } from '../constants'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const createGame = async (player, settings) => {
  const res = await fetch(`${API_BASE_URL}/api/game`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ player, settings }),
  })
  const { ok, game, message } = await res.json()
  if (!ok) {
    throw new Error(message)
  }
  return game
}

export const getGameById = async (gameCode) => {
  const res = await fetch(`${API_BASE_URL}/api/game?code=${gameCode}`, {
    method: 'GET',
    headers,
  })
  const { ok, game, message } = await res.json()
  if (!ok) {
    throw new Error(message)
  }
  return game
}

export const getPlayerGamesById = async (playerId) => {
  const res = await fetch(
    `${API_BASE_URL}/api/game/player/games?playerId=${playerId}`,
    {
      method: 'GET',
      headers,
    },
  )
  const { ok, playerGameCodeMappings, message } = await res.json()
  if (!ok) {
    throw new Error(message)
  }
  return playerGameCodeMappings
}
