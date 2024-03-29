/* eslint-disable require-jsdoc */
export default class PlayerState {
  player // Game player: Player
  word // Player's word: string
  isReady // Is player ready?: boolean
  guesses // Player's guessed words with results: GuessResult[]

  constructor(player) {
    this.player = player
    this.word = ''
    this.isReady = false
    this.guesses = []
  }

  static from(json) {
    return Object.assign(new PlayerState(), json)
  }

  setWord(word) {
    this.word = word
  }

  setIsReady() {
    this.isReady = true
  }

  addGuess(guessResult) {
    this.guesses.push(guessResult)
  }
}
