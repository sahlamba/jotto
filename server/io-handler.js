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
  })
}

export default ioHandler
