import React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'

import { useGameContext } from '../../../context/GameContext'

const GameOverDetails = () => {
  const { isGameOver, didPlayerWin, getAllJottoWords } = useGameContext()

  if (!isGameOver()) {
    return null
  }

  const renderAllJottoWords = () =>
    Object.entries(getAllJottoWords()).map(([playerName, word]) => (
      <Text key={playerName} color="white">
        <Text as="strong">{playerName}</Text>'s word: {word}
      </Text>
    ))

  return (
    <Flex
      w="100%"
      py={8}
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={didPlayerWin() ? 'green.500' : 'red.500'}>
      <Heading mb={4} color="white">
        You {didPlayerWin() ? 'win' : 'lose'}!
      </Heading>
      {renderAllJottoWords()}
    </Flex>
  )
}

export default GameOverDetails
