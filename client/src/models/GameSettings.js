export default class GameSettings {
  maxPlayers // int
  wordLength // int

  constructor(maxPlayers, wordLength) {
    this.maxPlayers = maxPlayers
    this.wordLength = wordLength
  }

  static from(json) {
    return Object.assign(new GameSettings(), json)
  }
}
