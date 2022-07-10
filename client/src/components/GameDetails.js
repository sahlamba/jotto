import React from 'react'
import { Badge, Flex, Text } from '@chakra-ui/react'

const GameCode = ({ game }) => {
  return (
    <Flex my={1} align="center">
      <Text color="green.500">Game Code:</Text>
      <Badge ml={1} colorScheme="green" variant="solid" fontSize="1.25rem">
        {game.code}
      </Badge>
    </Flex>
  )
}

const GameDetails = ({ game }) => {
  return (
    <Flex my={8} align="center" justifyContent="center">
      <GameCode game={game} />
    </Flex>
  )
}

export default GameDetails
