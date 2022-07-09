import { API_BASE_URL } from '../constants'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const createGame = (player, settings) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/game`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ player, settings }),
      })
      const { ok, game, message } = await res.json()
      if (!ok) {
        reject(message)
      }
      resolve(game)
    } catch (error) {
      reject(error)
    }
  })
}

export const getGameById = (gameCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/game?code=${gameCode}`, {
        method: 'GET',
        headers,
      })
      const { ok, game, message } = await res.json()
      if (!ok) {
        reject(message)
      }
      resolve(game)
    } catch (error) {
      reject(error)
    }
  })
}

export const getPlayerGamesById = (playerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/game/player/games?playerId=${playerId}`,
        {
          method: 'GET',
          headers,
        },
      )
      const { ok, playerGameCodeMappings, message } = await res.json()
      if (!ok) {
        reject(message)
      }
      resolve(playerGameCodeMappings)
    } catch (error) {
      reject(error)
    }
  })
}
