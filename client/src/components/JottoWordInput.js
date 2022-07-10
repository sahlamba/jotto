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
  Text,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useGameContext } from '../context/GameContext'

const JottoWordInput = ({ onSubmit, isLoading }) => {
  const { game, hasPlayerJoinedGame, isPlayerReady, playerJottoWord } =
    useGameContext()

  const [jottoWord, setJottoWord] = useState('')

  const updateJottoWord = (evt) => {
    evt.preventDefault()
    setJottoWord(evt.target.value ? evt.target.value.toUpperCase() : '')
  }

  const isValidJottoWord = () => {
    return jottoWord && jottoWord.length === game.settings.wordLength
  }

  const submit = (evt) => {
    evt.preventDefault()
    if (isValidJottoWord()) {
      onSubmit({ jottoWord })
    }
  }

  return (
    <Flex maxW="100%" mt={8} align="center" justifyContent="center">
      {hasPlayerJoinedGame() && !isPlayerReady() ? (
        <form onSubmit={submit}>
          <FormControl>
            <FormLabel htmlFor="jotto-word">Jotto Word</FormLabel>
            <InputGroup size="lg">
              <Input
                id="jotto-word"
                w="20rem"
                maxW="100%"
                size="lg"
                placeholder={`Enter ${game.settings.wordLength} letter word`}
                value={jottoWord ? jottoWord : ''}
                onChange={updateJottoWord}
                isInvalid={!isValidJottoWord()}
                errorBorderColor="crimson"
              />
              <InputRightElement width="auto">
                <Button
                  type="submit"
                  size="lg"
                  colorScheme="teal"
                  variant="solid"
                  rightIcon={<CheckIcon />}
                  isLoading={isLoading}>
                  Ready
                </Button>
              </InputRightElement>
            </InputGroup>
            {!isValidJottoWord() ? (
              <FormHelperText textAlign="center">
                {`Maximum allowed word length is ${game.settings.wordLength}.`}
              </FormHelperText>
            ) : null}
          </FormControl>
        </form>
      ) : null}
      {isPlayerReady() ? (
        <Text>Player ready with word: {playerJottoWord()}</Text>
      ) : null}
    </Flex>
  )
}

export default JottoWordInput
