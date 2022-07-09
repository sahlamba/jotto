import Jotto from '../jotto/index.js'
import {
  validateGameId,
  validatePlayer,
  validateSettings,
} from '../utils/validation.js'

export const getGame = (req, res, next) => {
  try {
    const { id } = req.query
    validateGameId(id)

    const game = Jotto.getGame(id)
    res.json({
      ok: true,
      game,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const createGame = (req, res, next) => {
  try {
    const { player, settings } = req.body
    validatePlayer(player)
    validateSettings(settings)

    const game = Jotto.newGame(player, settings)
    res.json({
      ok: true,
      game,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
