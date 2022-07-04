import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'

import Home from './components/Home'
import RegisterUser from './components/RegisterUser'
import GameWithSocket from './components/GameWithSocket'

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user" element={<RegisterUser />} />
          <Route path="game/:gameId" element={<GameWithSocket />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
