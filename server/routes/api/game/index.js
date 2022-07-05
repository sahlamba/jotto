import { Router as appRouter } from 'express'
import { getGame, createGame, joinGame } from '../../../controllers/game.js'
import { getPlayerGames } from '../../../controllers/player.js'

const routes = appRouter()

routes.get('/', getGame)
routes.post('/', createGame)

routes.put('/join', joinGame)

routes.get('/player/games', getPlayerGames)

export default routes
