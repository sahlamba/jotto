import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from 'unique-names-generator'
import queryString from 'query-string'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import User from '../models/User'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useLocalStorageState('JottoUser', null)
  const [randomName] = useState(
    uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: '-',
    }),
  )

  const isUserRegistered = () => user && user.id

  const redirectUrl = () => {
    if (location.search) {
      const query = queryString.parse(location.search)
      return query.next ? query.next : location.pathname
    }
    return location.pathname
  }

  useEffect(() => {
    if (!isUserRegistered()) {
      navigate(`/user?next=${redirectUrl()}`)
      return
    }
    navigate(redirectUrl())
  }, [user])

  const updateName = (event) => {
    setUser(event.target.value)
  }

  const persistUser = (event) => {
    event.preventDefault()
    // Transform to User model with UUID and overwrite
    setUser(new User(user && user !== '' ? user : randomName))
  }

  return (
    <UserContext.Provider value={{ user, randomName, updateName, persistUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
