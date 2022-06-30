import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import ioHandler from './io-handler.js'
import routes from './routes/index.js'
import Database from './db.js'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8080

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join('client', 'build')))
} else {
  app.get('/', (req, res) => {
    res.send(
      'Jotto! React app at: <a href="http://localhost:3000">http://localhost:3000</a>',
    )
  })
}

// Connect all routes
app.use(routes)

server.listen(port, () => {
  console.log(`Jotto server started at http://localhost:${port}`)
})

ioHandler(server)

// Initialize database
Database.init()
