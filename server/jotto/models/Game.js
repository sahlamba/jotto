/* eslint-disable max-len */
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

  readyPlayer(player, jottoWord) {
    this.verifyCanReadyPlayer(player)
    this.validateJottoWord(jottoWord)

    const playerState = PlayerState.from(this.players[player.id])
    playerState.setIsReady()
    playerState.setWord(jottoWord)
    this.players[player.id] = playerState

    if (this.allPlayersAreReady()) {
      this.state = GameState.READY_TO_START
    }
  }

  allPlayersAreReady() {
    return Object.values(this.players).reduce(
      (currPlayerState, accumulatedIsReady) =>
        accumulatedIsReady && currPlayerState.isReady,
      true,
    )
  }

  verifyCanAddPlayer() {
    if (this.state !== GameState.CREATED) {
      throw new Error(
        `Cannot addPlayer, expected game state: ${GameState.CREATED}, actual: ${this.state}`,
      )
    }
    if (Object.keys(this.players).length === this.settings.maxPlayers) {
      throw new Error(
        `Cannot addPlayer, max players limit (${this.settings.maxPlayers}) reached`,
      )
    }
  }

  verifyCanReadyPlayer(player) {
    if (this.state !== GameState.CREATED) {
      throw new Error(
        `Cannot readyPlayer, expected game state: ${GameState.CREATED}, actual: ${this.state}`,
      )
    }
    if (!this.players[player.id]) {
      throw new Error(
        `Player ID ${player.id} (${player.name}) does not exist in current game!`,
      )
    }
  }

  validateJottoWord(word) {
    const expectedWordLength = this.settings.wordLength
    const actualWordLength = word.length
    if (actualWordLength !== expectedWordLength) {
      throw new Error(
        `${word} is not a valid word due to length mismatch, expected:${expectedWordLength}, actual:${actualWordLength}`,
      )
    }
  }
}
