/* eslint-disable require-jsdoc */
import { v4 as uuidV4 } from 'uuid'

export default class Game {
  id // Game session ID: UUID
  admin // Game admin: User

  constructor(admin) {
    this.id = uuidV4()
    this.admin = admin
  }
}
