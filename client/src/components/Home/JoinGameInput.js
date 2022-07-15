import React, { useState } from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'

const JoinGameInput = ({ onSubmit }) => {
  const [gameCode, setGameCode] = useState('')

  const updateGameCode = (evt) => {
    evt.preventDefault()
    setGameCode(evt.target.value)
  }

  const isValidGameCode = () => {
    return gameCode && gameCode.length === 8
  }

  const submit = (evt) => {
    evt.preventDefault()
    if (isValidGameCode()) {
      onSubmit({ gameCode })
    }
  }

  return (
    <Flex maxW="100%" align="center" justifyContent="center">
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup size="lg">
            <Input
              w="20rem"
              maxW="100%"
              size="lg"
              placeholder="Game Code"
              value={gameCode}
              onChange={updateGameCode}
              isInvalid={!isValidGameCode()}
              errorBorderColor="crimson"
            />
            <InputRightElement width="auto">
              <Button
                type="submit"
                size="lg"
                colorScheme="purple"
                variant="solid"
                rightIcon={<ArrowRightIcon />}>
                Join
              </Button>
            </InputRightElement>
          </InputGroup>
          {!isValidGameCode() ? (
            <FormHelperText textAlign="center">
              Game codes are 8 characters long.
            </FormHelperText>
          ) : null}
        </FormControl>
      </form>
    </Flex>
  )
}

export default JoinGameInput
