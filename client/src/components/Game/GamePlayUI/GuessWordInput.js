import React, { useState } from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'

import { useGameContext } from '../../../context/GameContext'

import { notify } from '../../../utils/ui'

const GuessWordInput = ({ onSubmit, isLoading }) => {
  const { game, isGameOver } = useGameContext()

  const validGuessWordDescription = `Word should have ${game.settings.wordLength} letters.`

  const [guessWord, setGuessWord] = useState('')

  const toast = useToast()

  const updateGuessWord = (evt) => {
    evt.preventDefault()
    setGuessWord(evt.target.value ? evt.target.value.toUpperCase() : '')
  }

  const isValidGuessWord = () => {
    return guessWord && guessWord.length === game.settings.wordLength
  }

  const submit = (evt) => {
    evt.preventDefault()
    if (isValidGuessWord()) {
      setGuessWord('')
      onSubmit({ guessWord })
    } else {
      notify(toast, {
        title: 'Invalid word!',
        description: validGuessWordDescription,
        status: 'error',
      })
    }
  }

  return (
    <Flex maxW="100%" alignItems="center" justifyContent="center">
      <form onSubmit={submit}>
        <FormControl>
          <FormLabel htmlFor="jotto-word">Guess opponent's word</FormLabel>
          <InputGroup size="lg">
            <Input
              disabled={isGameOver()}
              id="jotto-word"
              w="20rem"
              maxW="100%"
              size="lg"
              placeholder={`Enter ${game.settings.wordLength} letter word`}
              value={guessWord ? guessWord : ''}
              onChange={updateGuessWord}
              isInvalid={guessWord && !isValidGuessWord()}
              errorBorderColor="crimson"
              autoComplete="off"
              autoFocus
            />
            <InputRightElement width="auto">
              <Button
                type="submit"
                size="lg"
                colorScheme="green"
                variant="solid"
                isLoading={isLoading}>
                Guess?
              </Button>
            </InputRightElement>
          </InputGroup>
          {guessWord && !isValidGuessWord() ? (
            <FormHelperText textAlign="center">
              {validGuessWordDescription}
            </FormHelperText>
          ) : null}
        </FormControl>
      </form>
    </Flex>
  )
}

export default GuessWordInput
