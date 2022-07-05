import Jotto from '../jotto/index.js'

export const getPlayerGames = (req, res, next) => {
  try {
    const { playerId } = req.query
    if (!playerId) {
      throw new Error('Missin player ID, API usage: ?playerId=<playerId>')
    }
    const playerGameIdMappings = Jotto.getPlayerJoinedGames(playerId)
    res.json({
      ok: true,
      playerGameIdMappings,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
