import Database from '../db.js'

export const getGames = (req, res) => {
  try {
    const games = Database.getGames()
    res.json({
      ok: true,
      games,
    })
  } catch (error) {
    console.log(error)
  }
}

export const createGame = (req, res) => {
  try {
    const { user } = req.body
    if (!user || !user.id) {
      res.status(400).send({
        ok: false,
        message: `Invalid user data: ${JSON.stringify(user)}`,
      })
      return
    }
    const game = Database.createGame(user)
    res.json({
      ok: true,
      game,
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteGame = (req, res) => {
  try {
    const { gameId } = req.body
    if (!gameId) {
      res.status(400).send({
        ok: false,
        message: `Invalid game ID: ${gameId}`,
      })
      return
    }
    Database.deleteGame(gameId)
    const game = Database.getGame(gameId)
    res.json({
      ok: !game,
    })
  } catch (error) {
    console.log(error)
  }
}
