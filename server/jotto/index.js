import JottoDatabase from './db.js'
import Game from './models/Game.js'

/* eslint-disable require-jsdoc */
export default class Jotto {
  static db = new JottoDatabase()

  static newGame(user, settings) {
    const game = new Game(user, settings)
    this.db.saveGame(game)
    return game
  }
}
