import React from 'react'
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Badge,
  Flex,
  Text,
} from '@chakra-ui/react'

import { useGameContext } from '../../context/GameContext'

const GameCode = ({ game }) => {
  return (
    <Flex my={1} mx={1} align="center">
      <Text color="green.500">Game Code:</Text>
      <Badge ml={1} colorScheme="green" variant="solid" fontSize="1.25rem">
        {game.code}
      </Badge>
    </Flex>
  )
}

const PlayerJottoWord = ({ playerJottoWord }) => {
  const word = playerJottoWord()
  if (!word) return null

  return (
    <Flex my={1} mx={1} align="center">
      <Text>Your Word:</Text>
      <Badge ml={1} variant="solid" fontSize="1.25rem">
        {word}
      </Badge>
    </Flex>
  )
}

const PlayersInGame = ({ game }) => {
  const renderPlayerNamesInGame = () =>
    game ? (
      <Flex my={1} mx={1} align="center">
        <Text>Players in Room:</Text>
        <AvatarGroup size="sm" max={10}>
          {Object.values(game.players).map((playerState) => (
            <Avatar key={playerState.player.id} name={playerState.player.name}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          ))}
        </AvatarGroup>
      </Flex>
    ) : (
      []
    )

  return (
    <Flex my={1} mx={1} align="center">
      {renderPlayerNamesInGame()}
    </Flex>
  )
}

const GameDetails = () => {
  const { game, playerJottoWord } = useGameContext()

  return (
    <React.Fragment>
      <Flex my={4} align="center" justifyContent="center">
        <GameCode game={game} />
        <PlayerJottoWord playerJottoWord={playerJottoWord} />
      </Flex>
      <Flex my={4} align="center" justifyContent="center">
        <PlayersInGame game={game} />
      </Flex>
    </React.Fragment>
  )
}

export default GameDetails
