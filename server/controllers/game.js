import Jotto from '../jotto/index.js'
import { validateUser, validateSettings } from '../utils/validation.js'

export const createGame = (req, res, next) => {
  try {
    const { user, settings } = req.body
    validateUser(user)
    validateSettings(settings)

    const game = Jotto.newGame(user, settings)
    res.json({
      ok: true,
      game,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
