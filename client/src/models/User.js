import { v4 as uuidV4 } from 'uuid'

export default class User {
  id // User ID: UUID
  name // User name: string

  constructor(name) {
    this.id = uuidV4()
    this.name = name
  }
}
