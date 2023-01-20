import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { PlayerProvider } from './context/PlayerContext'

import packageJson from '../package.json'

import Home from './components/Home'
import RegisterPlayer from './components/RegisterPlayer'
import Game from './components/Game'

const App = () => {
  return (
    <ChakraProvider>
      <Router basename={packageJson.homepage}>
        <PlayerProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/player" element={<RegisterPlayer />} />
            <Route path="/game/:gameCode" element={<Game />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PlayerProvider>
      </Router>
    </ChakraProvider>
  )
}

export default App
