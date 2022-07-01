import { Router as appRouter } from 'express'
import { createGame } from '../../../controllers/game.js'

const routes = appRouter()

routes.post('/', createGame)

export default routes
