import { Router as appRouter } from 'express'
import { getGame, createGame } from '../../../controllers/game.js'

const routes = appRouter()

routes.get('/', getGame)
routes.post('/', createGame)

export default routes
