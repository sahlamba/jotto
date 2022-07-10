import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const CreateGameInput = ({ onSubmit, isCreatingGame }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [wordLength, setWordLength] = useState(4)
  const [maxPlayers, setMaxPlayers] = useState(2) // Fixed to 2 for MVP

  const updateWordLength = (valueAsString, valueAsNumber) => {
    setWordLength(valueAsNumber)
  }

  const updateMaxPlayers = (valueAsString, valueAsNumber) => {
    setMaxPlayers(valueAsNumber)
  }

  const submit = (evt) => {
    evt.preventDefault()
    onSubmit({
      gameSettings: {
        maxPlayers,
        wordLength,
      },
    })
  }

  return (
    <React.Fragment>
      <Button
        colorScheme="purple"
        variant="outline"
        rightIcon={<AddIcon />}
        onClick={onOpen}>
        Create Game
      </Button>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Game Settings</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submit}>
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="max-players">Players</FormLabel>
                {/* Fixed to 2 for MVP, hence disabled */}
                <NumberInput
                  max={4}
                  min={2}
                  value={maxPlayers}
                  onChange={updateMaxPlayers}
                  disabled={true}>
                  <NumberInputField id="max-players" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="word-length">Word Length</FormLabel>
                <NumberInput
                  max={5}
                  min={3}
                  value={wordLength}
                  onChange={updateWordLength}
                  disabled={isCreatingGame}>
                  <NumberInputField id="word-length" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={2}>
                <Button onClick={onClose} disabled={isCreatingGame}>
                  Close
                </Button>
                <Button
                  type="submit"
                  colorScheme="purple"
                  variant="solid"
                  isLoading={isCreatingGame}>
                  Create
                </Button>
              </Stack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default CreateGameInput
