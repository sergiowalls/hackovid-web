import React from 'react'
import { useStoreon } from 'storeon/react'

import { AuthEvents, AuthState } from '../../store/auth'

const LoginPage = () => {
  const { dispatch, error } = useStoreon<AuthState, AuthEvents>('error')

  const handleOnLoginClick = () => {
    dispatch('login', { username: 'test', password: 'test' })
  }

  return (
    <div>
      <div>
        Login Page
      </div>
      <button onClick={handleOnLoginClick}>Login</button>
      <div>
        {error}
      </div>
    </div>
  )
}

export { LoginPage }
