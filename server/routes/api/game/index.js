import { Router as appRouter } from 'express'
import { getGames, createGame, deleteGame } from '../../../controllers/game.js'

const routes = appRouter()

routes.get('/', getGames)
routes.post('/', createGame)
routes.delete('/', deleteGame)

export default routes
