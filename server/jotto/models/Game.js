/* eslint-disable require-jsdoc */
import { v4 as uuidV4 } from 'uuid'

export default class Game {
  id // Game session ID: UUID
  admin // Game admin: User
  settings // Game settings: GameSettings

  constructor(admin, settings) {
    this.id = uuidV4()
    this.admin = admin
    this.settings = settings
  }
}
