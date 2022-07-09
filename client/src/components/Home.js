import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Flex,
  Button,
  Heading,
  List,
  ListItem,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react'
import { AddIcon, ArrowRightIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { usePlayerContext } from '../context/PlayerContext'
import { createGame, getPlayerGamesById } from '../utils/apiClient'
import GameSettings from '../models/GameSettings'
import Header from './common/Header'

const Home = () => {
  const navigate = useNavigate()

  const { player } = usePlayerContext()
  const [playerGameCodeMappings, setPlayerGameCodeMappings] = useState([])
  const [gameCode, setGameCode] = useState('')

  const getAndSetPlayerGames = async () => {
    try {
      if (!player) {
        return
      }
      const res = await getPlayerGamesById(player.id)
      setPlayerGameCodeMappings(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAndSetPlayerGames()
  }, [])

  const updateGameCode = (evt) => {
    evt.preventDefault()
    setGameCode(evt.target.value)
  }

  const isValidGameCode = () => {
    return gameCode.length <= 8
  }

  const joinGameOnClick = () => {
    navigate(`/game/${gameCode}`)
  }

  const createGameOnClick = async () => {
    try {
      const game = await createGame(player, new GameSettings(2, 4))
      navigate(`/game/${game.code}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <Header player={player} />
      <Flex
        py={16}
        px={4}
        direction="column"
        align="center"
        justifyContent="center">
        <Flex maxW="100%" align="center" justifyContent="center">
          <FormControl>
            <InputGroup size="lg">
              <Input
                w="24rem"
                maxW="100%"
                size="lg"
                placeholder="Game code"
                value={gameCode}
                onChange={updateGameCode}
                isInvalid={!isValidGameCode()}
                errorBorderColor="crimson"
              />
              <InputRightElement width="auto">
                <Button
                  size="lg"
                  colorScheme="purple"
                  variant="solid"
                  rightIcon={<ArrowRightIcon />}
                  onClick={joinGameOnClick}>
                  Join Game
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>Game codes are 8 characters long.</FormHelperText>
          </FormControl>
        </Flex>
        <Heading my={8} size="sm">
          OR
        </Heading>
        <Button
          colorScheme="purple"
          variant="outline"
          rightIcon={<AddIcon />}
          onClick={createGameOnClick}>
          Create Game
        </Button>
      </Flex>
      {playerGameCodeMappings && playerGameCodeMappings.length ? (
        <Flex direction="column" align="center" justifyContent="center">
          <Heading size="md" mb={4}>
            Your Live Games
          </Heading>
          <List spacing={2}>
            {playerGameCodeMappings.map(({ gameCode }) => (
              <ListItem key={gameCode}>
                <Link as={RouterLink} to={`/game/${gameCode}`} isExternal>
                  {gameCode} <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
            ))}
          </List>
        </Flex>
      ) : null}
    </React.Fragment>
  )
}

export default Home
