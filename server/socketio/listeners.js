import Jotto from '../jotto/index.js'
import { validatePlayer } from '../utils/validation.js'

const onPlayerJoinsGame = (_io, _socket, { gameId, player }) => {
  try {
    validatePlayer(player)
    Jotto.joinGame(gameId, player)

    _socket.join(gameId)
    _io.to(gameId).emit('player_joined_game', { game: Jotto.getGame(gameId) })
  } catch (error) {
    const { name, message } = error
    _socket.emit('join_game_error', { name, message })
  }
}

export const GameServerEvents = [
  {
    name: 'join_game',
    listener: onPlayerJoinsGame,
  },
]
