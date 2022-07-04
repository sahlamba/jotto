import { SocketProvider } from '../context/SocketContext'
import Game from './Game'

const GameWithSocket = () => {
  return (
    <SocketProvider>
      <Game />
    </SocketProvider>
  )
}

export default GameWithSocket
