import { Server } from 'socket.io'

const ioHandler = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  })

  io.totalConnections = 0
  io.on('connection', (socket) => {
    io.totalConnections += 1
    console.log(`Socket.io CONNECT (${io.totalConnections})`)

    socket.on('disconnect', () => {
      io.totalConnections -= 1
      console.log(`Socket.io DISCONNECT (${io.totalConnections})`)
    })

    socket.on('join_game', ({ user, gameId }) => {
      socket.join(gameId)
      console.log('join_game', { user, gameId })
    })

    socket.on('leave_game', ({ user, gameId }) => {
      socket.leave(gameId)
      console.log('leave_game', { user, gameId })
    })
  })
}

export default ioHandler
