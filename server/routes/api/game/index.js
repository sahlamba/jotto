import { Router as appRouter } from 'express'
import { getGame, createGame } from '../../../controllers/game.js'
import { getPlayerGames } from '../../../controllers/player.js'

const routes = appRouter()

routes.get('/', getGame)
routes.post('/', createGame)

routes.get('/player/games', getPlayerGames)

export default routes
