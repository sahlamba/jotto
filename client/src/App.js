import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext'

import Home from './components/Home'
import RegisterPlayer from './components/RegisterPlayer'
import GameWithSocket from './components/GameWithSocket'

const App = () => {
  return (
    <Router>
      <PlayerProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<RegisterPlayer />} />
          <Route path="/game/:gameId" element={<GameWithSocket />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PlayerProvider>
    </Router>
  )
}

export default App
