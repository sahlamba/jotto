import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Heading, Text, Badge, Tooltip } from '@chakra-ui/react'

const Header = ({ player, socket }) => {
  return (
    <Flex
      py={8}
      px={24}
      direction="column"
      align="center"
      justifyContent="space-between"
      color="purple.700"
      boxShadow="lg">
      <Heading>
        <Link to="/">Jotto</Link>
      </Heading>
      <Flex align="center">
        <Text mr={1}>Player Name:</Text>
        <Tooltip
          isDisabled={!socket}
          label={`Socket ID: ${socket ? socket.id : ''}`}
          hasArrow>
          <Badge colorScheme="purple" variant="solid">
            {player ? player.name : 'player not registered'}
          </Badge>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default Header
