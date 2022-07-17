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
import { CheckIcon } from '@chakra-ui/icons'

import { useGameContext } from '../../../context/GameContext'

import { notify } from '../../../utils/ui'

const JottoWordInput = ({ onSubmit, isLoading }) => {
  const { game } = useGameContext()

  const validJottoWordDescription = `Word should have ${game.settings.wordLength} letters.`

  const [jottoWord, setJottoWord] = useState('')

  const toast = useToast()

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
    } else {
      notify(toast, {
        title: 'Invalid word!',
        description: validJottoWordDescription,
        status: 'error',
      })
    }
  }

  return (
    <Flex maxW="100%" mt={8} alignItems="center" justifyContent="center">
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
              isInvalid={jottoWord && !isValidJottoWord()}
              errorBorderColor="crimson"
            />
            <InputRightElement width="auto">
              <Button
                type="submit"
                size="lg"
                colorScheme="green"
                variant="solid"
                rightIcon={<CheckIcon />}
                isLoading={isLoading}>
                Ready
              </Button>
            </InputRightElement>
          </InputGroup>
          {jottoWord && !isValidJottoWord() ? (
            <FormHelperText textAlign="center">
              {validJottoWordDescription}
            </FormHelperText>
          ) : null}
        </FormControl>
      </form>
    </Flex>
  )
}

export default JottoWordInput
