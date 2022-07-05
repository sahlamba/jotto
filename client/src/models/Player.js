import { v4 as uuidV4 } from 'uuid'

export default class Player {
  id // Player ID: UUID
  name // Player name: string

  constructor(name) {
    this.id = uuidV4()
    this.name = name
  }
}
