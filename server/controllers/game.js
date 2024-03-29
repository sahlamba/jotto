import Jotto from '../jotto/index.js'
import {
  validateGameCode,
  validatePlayer,
  validateSettings,
} from '../utils/validation.js'

export const getGame = (req, res, next) => {
  try {
    const { code } = req.query
    validateGameCode(code)

    const game = Jotto.getGame(code)
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
