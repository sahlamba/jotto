/* eslint-disable require-jsdoc */
import loki from 'lokijs'

export default class JottoDatabase {
  db
  games // Collection to store currently live games
  playerGames // Collection to store a player's currently joined games

  debugLogger

  constructor() {
    // eslint-disable-next-line new-cap
    this.db = new loki('jotto.db', { adapter: new loki.LokiMemoryAdapter() })
    this.games = this.db.addCollection('games', {
      unique: 'id',
      autoupdate: true,
    })
    this.playerGames = this.db.addCollection('player_games', {
      unique: 'id',
      autoupdate: true,
    })

    // Enable periodic DB logging in local env for debugging
    if (process.env.NODE_ENV !== 'production') {
      this.debugLogger = setInterval(() => {
        const renderOptions = {
          removeMeta: true,
        }
        const allGames = this.games.addDynamicView('all_games')
        const playerGames = this.playerGames.addDynamicView('all_player_games')

        console.log(
          Math.random(),
          allGames.data(renderOptions),
          playerGames.data(renderOptions),
        )
      }, 10000)
    }
  }

  insertGame(game) {
    this.games.insert(this.jsonify(game))
  }

  getGameById(gameId) {
    return this.games.findOne({ id: gameId })
  }

  getAllGames() {
    return this.games.find()
  }

  updateGame(game) {
    this.games.update(this.jsonify(game))
  }

  deleteGame(gameId) {
    this.games.findAndRemove({ id: gameId })
  }

  insertPlayerGame(player, gameId) {
    const id = `${player.id}:${gameId}`
    this.playerGames.insert(this.jsonify({ id, playerId: player.id, gameId }))
  }

  getPlayerGamesByPlayerId(playerId) {
    return this.playerGames.find({ playerId })
  }

  jsonify(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}
