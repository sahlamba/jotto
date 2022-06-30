/* eslint-disable require-jsdoc */
import loki from 'lokijs'
import Game from './models/Game.js'

export default class Database {
  static db
  static games

  static init() {
    // eslint-disable-next-line new-cap
    this.db = new loki('jotto.db', { adapter: new loki.LokiMemoryAdapter() })
    this.games = this.db.addCollection('games')
  }

  static createGame(admin) {
    const game = JSON.parse(JSON.stringify(new Game(admin)))
    this.games.insert(game)
    return game
  }

  static getGame(gameId) {
    return this.games.findOne({ id: gameId })
  }

  static getGames() {
    return this.games.find()
  }

  static deleteGame(gameId) {
    this.games.findAndRemove({ id: gameId })
  }
}
