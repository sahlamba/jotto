import Jotto from '../jotto/index.js'
import {
  validateGameCode,
  validateJottoWord,
  validatePlayer,
} from '../utils/validation.js'

const errorInstanceToJson = (error) => {
  return {
    name: error.name,
    message: error.message,
  }
}

const onPlayerConnected = (_io, _socket, { gameCode, player }, callback) => {
  try {
    validateGameCode(gameCode)
    validatePlayer(player)

    _socket.join(gameCode)

    callback()
  } catch (error) {
    callback(errorInstanceToJson(error))
  }
}

const onPlayerDisconnected = (_io, _socket, { gameCode, player }) => {
  try {
    validateGameCode(gameCode)
    validatePlayer(player)

    _socket.leave(gameCode)
  } catch (error) {
    console.error(errorInstanceToJson(error))
  }
}

const onPlayerJoinsGame = (_io, _socket, { gameCode, player }, callback) => {
  try {
    validateGameCode(gameCode)
    validatePlayer(player)

    Jotto.joinGame(gameCode, player)

    _socket.join(gameCode)
    _io
      .to(gameCode)
      .emit('player_joined_game', { gameState: Jotto.getGame(gameCode) })
    callback()
  } catch (error) {
    callback(errorInstanceToJson(error))
  }
}

const onPlayerReady = (
  _io,
  _socket,
  { gameCode, player, jottoWord },
  callback,
) => {
  try {
    validateGameCode(gameCode)
    validatePlayer(player)
    validateJottoWord(jottoWord)

    Jotto.readyPlayer(gameCode, player, jottoWord)

    _io.to(gameCode).emit('player_ready_in_game', {
      gameState: Jotto.getGame(gameCode),
      player,
    })
    callback()
  } catch (error) {
    callback(errorInstanceToJson(error))
  }
}

const onStartGame = (_io, _socket, { gameCode }, callback) => {
  try {
    validateGameCode(gameCode)

    Jotto.startGame(gameCode)

    _io.to(gameCode).emit('game_started', {
      gameState: Jotto.getGame(gameCode),
    })
    callback()
  } catch (error) {
    callback(errorInstanceToJson(error))
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
  {
    name: 'start_game',
    listener: onStartGame,
  },
]
