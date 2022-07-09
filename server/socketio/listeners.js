import Jotto from '../jotto/index.js'
import {
  validateGameId,
  validateJottoWord,
  validatePlayer,
} from '../utils/validation.js'

const errorInstanceToJson = (error) => {
  return {
    name: error.name,
    message: error.message,
  }
}

const onPlayerConnected = (_io, _socket, { gameId, player }, callback) => {
  try {
    validateGameId(gameId)
    validatePlayer(player)

    _socket.join(gameId)

    callback()
  } catch (error) {
    callback(errorInstanceToJson(error))
  }
}

const onPlayerDisconnected = (_io, _socket, { gameId, player }) => {
  try {
    validateGameId(gameId)
    validatePlayer(player)

    _socket.leave(gameId)
  } catch (error) {
    console.error(errorInstanceToJson(error))
  }
}

const onPlayerJoinsGame = (_io, _socket, { gameId, player }) => {
  try {
    validateGameId(gameId)
    validatePlayer(player)

    Jotto.joinGame(gameId, player)

    _socket.join(gameId)
    _io
      .to(gameId)
      .emit('player_joined_game', { gameState: Jotto.getGame(gameId) })
  } catch (error) {
    _socket.emit('join_game_error', errorInstanceToJson(error))
  }
}

const onPlayerReady = (_io, _socket, { gameId, player, jottoWord }) => {
  try {
    validateGameId(gameId)
    validatePlayer(player)
    validateJottoWord(jottoWord)

    Jotto.readyPlayer(gameId, player, jottoWord)

    _io.to(gameId).emit('player_ready_in_game', {
      gameState: Jotto.getGame(gameId),
      player,
    })
  } catch (error) {
    _socket.emit('ready_player_error', errorInstanceToJson(error))
  }
}

export const GameServerEvents = [
  {
    name: 'connect_player',
    listener: onPlayerConnected,
  },
  {
    name: 'disconnect_player',
    listener: onPlayerDisconnected,
  },
  {
    name: 'join_game',
    listener: onPlayerJoinsGame,
  },
  {
    name: 'ready_player',
    listener: onPlayerReady,
  },
]
