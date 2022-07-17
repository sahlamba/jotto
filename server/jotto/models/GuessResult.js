/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export default class GuessResult {
  guessWord // Guessed word: string
  letterMatchCount // No of matching letters between guessWord and targetWord: int
  isCompleteMatch // Guess words exactly matches target word?: bool

  constructor(guessWord, letterMatchCount, isCompleteMatch) {
    this.guessWord = guessWord
    this.letterMatchCount = letterMatchCount
    this.isCompleteMatch = isCompleteMatch
  }

  static compute(guessWord, targetWord) {
    if (!guessWord || !targetWord) {
      throw new Error(`Illegal words, ${guessWord} and ${targetWord}!`)
    }

    if (guessWord.length !== targetWord.length) {
      throw new Error(
        `Input words are of different lengths, ${guessWord.length} and ${targetWord.length} respectively!`,
      )
    }

    if (guessWord === targetWord) {
      return new GuessResult(guessWord, guessWord.length, true)
    }

    const word1Letters = [...new Set(guessWord.split(''))]
    const word2Letters = new Set(targetWord.split(''))

    const letterMatchCount = word1Letters.filter((letter) =>
      word2Letters.has(letter),
    ).length

    return new GuessResult(guessWord, letterMatchCount, false)
  }
}
