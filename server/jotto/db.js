/* eslint-disable require-jsdoc */
import loki from 'lokijs'

export default class JottoDatabase {
  db
  games

  constructor() {
    // eslint-disable-next-line new-cap
    this.db = new loki('jotto.db', { adapter: new loki.LokiMemoryAdapter() })
    this.games = this.db.addCollection('games')
  }

  saveGame(game) {
    this.games.insert(JSON.parse(JSON.stringify(game)))
  }

  getGame(gameId) {
    return this.games.findOne({ id: gameId })
  }

  getGames() {
    return this.games.find()
  }

  deleteGame(gameId) {
    this.games.findAndRemove({ id: gameId })
  }
}
