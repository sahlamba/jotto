import Jotto from '../jotto/index.js'
import {
  validateGameId,
  validateJottoWord,
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
    console.log(error)
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
    console.log(error)
    next(error)
  }
}

export const joinGame = (req, res, next) => {
  try {
    const { gameId, player } = req.body
    validatePlayer(player)

    Jotto.joinGame(gameId, player)
    res.json({
      ok: true,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const readyPlayer = (req, res, next) => {
  try {
    const { gameId, player, jottoWord } = req.body
    validateGameId(gameId)
    validatePlayer(player)
    validateJottoWord(jottoWord)

    Jotto.readyPlayer(gameId, player, jottoWord)
    const game = Jotto.getGame(gameId)
    res.json({
      ok: true,
      game,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
