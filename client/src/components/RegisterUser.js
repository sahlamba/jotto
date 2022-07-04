import React from 'react'
import { useUserContext } from '../context/UserContext'

const RegisterUser = () => {
  const { user, randomName, updateName, persistUser } = useUserContext()

  return (
    <React.Fragment>
      <form onSubmit={persistUser}>
        <label htmlFor="username">Jotto username: </label>
        <input
          id="username"
          placeholder={randomName}
          value={user ? user : ''}
          onChange={updateName}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  )
}

export default RegisterUser
