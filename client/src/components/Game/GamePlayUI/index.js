import React from 'react'
import { Flex, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

import { useGameContext } from '../../../context/GameContext'

import GuessWordInput from './GuessWordInput'
import GameOverDetails from './GameOverDetails'

const GamePlayUI = () => {
  const { guessPlayerWord, guessingWord, getPlayerGuesses, isGameOver } =
    useGameContext()

  const guessWordOnClick = ({ guessWord }) => {
    guessPlayerWord(guessWord)
  }

  const getLatestGuesses = (n) =>
    getPlayerGuesses()
      .map((guess, index, guesses) => guesses[guesses.length - 1 - index])
      .slice(0, n)

  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      {isGameOver() ? (
        <GameOverDetails />
      ) : (
        <GuessWordInput onSubmit={guessWordOnClick} isLoading={guessingWord} />
      )}
      <Flex direction="column" alignItems="center">
        <Heading as="u" mt={8} mb={3} size="sm" color="gray.800">
          Your guesses
        </Heading>
        <List spacing={1}>
          {/* Show only last 10 guesses */}
          {getLatestGuesses(10)
            .map((guess, index) => (
              <ListItem key={`${guess}-${index}`}>
                {guess.isCompleteMatch && (
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                )}
                {guess.guessWord} (Matching letters: {guess.letterMatchCount}){' '}
              </ListItem>
            ))
            .slice(0, 10)}
        </List>
      </Flex>
    </Flex>
  )
}

export default GamePlayUI
