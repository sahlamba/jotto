import JottoDatabase from './db.js'
import Game from './models/Game.js'

/* eslint-disable require-jsdoc */
export default class Jotto {
  static db = new JottoDatabase()

  static newGame(player, settings) {
    const game = new Game(player, settings)
    this.db.insertGame(game)
    return game
  }

  static getGame(gameId) {
    const gameJson = this.db.getGameById(gameId)
    if (gameJson) {
      return Game.from(gameJson)
    }
    return null
  }

  static joinGame(gameId, player) {
    const game = this.getGame(gameId)
    if (!game) {
      throw new Error(`Could not find game with ID: ${gameId}`)
    }

    /*
     * If player has already joined the game,
     * this method will throw an error (expected behviour).
     */
    this.db.insertPlayerGame(player, gameId)

    game.addPlayer(player)
    this.db.updateGame(game)
  }

  static getPlayerJoinedGames(playerId) {
    return this.db.getPlayerGamesByPlayerId(playerId)
  }
}
