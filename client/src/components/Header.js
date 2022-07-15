import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Heading, Text, Badge, Tooltip } from '@chakra-ui/react'

const Header = ({ player, socket }) => {
  return (
    <Flex
      py={8}
      px={16}
      direction="column"
      align="center"
      justifyContent="space-between"
      color="purple.800"
      boxShadow="lg">
      <Heading>
        <Link to="/">Jotto</Link>
      </Heading>
      {player ? (
        <Flex align="center">
          <Text mr={1} color="teal.500">
            Player ID:
          </Text>
          <Tooltip
            isDisabled={!socket}
            label={`Socket ID: ${socket ? socket.id : ''}`}
            hasArrow>
            <Badge colorScheme="teal" variant="solid">
              {player.name}
            </Badge>
          </Tooltip>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Header
