import Jotto from '../jotto/index.js'

export const getPlayerGames = (req, res, next) => {
  try {
    const { playerId } = req.query
    if (!playerId) {
      throw new Error('Missin player ID, API usage: ?playerId=<playerId>')
    }
    const playerGameCodeMappings = Jotto.getPlayerJoinedGames(playerId)
    res.json({
      ok: true,
      playerGameCodeMappings,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
