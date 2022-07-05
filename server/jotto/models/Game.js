/* eslint-disable require-jsdoc */
import { v4 as uuidV4 } from 'uuid'
import PlayerState from './PlayerState.js'

export const GameState = {
  CREATED: 'CREATED',
  READY_TO_START: 'READY_TO_START',
  PLAYING: 'PLAYING',
  OVER: 'OVER',
}

export default class Game {
  id // Game session ID: UUID
  admin // Game admin: Player
  settings // Game settings: GameSettings
  state // Game state: GameState
  players // Players who joined the game: Map<UUID, PlayerState>

  constructor(admin, settings) {
    this.id = uuidV4()
    this.admin = admin
    this.settings = settings
    this.state = GameState.CREATED
    this.players = {}
  }

  static from(json) {
    return Object.assign(new Game(), json)
  }

  addPlayer(player) {
    this.verifyCanAddPlayer()
    this.players[player.id] = new PlayerState(player)
  }

  verifyCanAddPlayer() {
    if (this.state !== GameState.CREATED) {
      throw new Error(
        // eslint-disable-next-line max-len
        `Cannot addPlayer, expected game state: ${GameState.CREATED}, actual: ${this.state}`,
      )
    }
    if (Object.keys(this.players).length === this.settings.maxPlayers) {
      throw new Error(
        // eslint-disable-next-line max-len
        `Cannot addPlayer, max players limit (${this.settings.maxPlayers}) reached`,
      )
    }
  }
}
