import React from 'react'
import { Link } from 'react-router-dom'

const WelcomeMessage = ({ player, socket }) => {
  return (
    <React.Fragment>
      <h1>
        Welcome to <Link to="/">Jotto</Link>,{' '}
        {player ? player.name : 'player not registered'}!
      </h1>
      {socket ? <pre>Connected with socket ID: {socket.id}</pre> : null}
    </React.Fragment>
  )
}

export default WelcomeMessage
