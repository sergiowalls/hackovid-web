import React from 'react'
import { useStoreon } from 'storeon/react'
import { Button } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'

import { AuthEvents, AuthState } from '../../store/auth'
import { PublicPage } from '../../lib/molecules/PublicPage/PublicPage'
import { Container } from '../../lib/atoms/Container/Container'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'

const LoginPage = () => {
  const history = useHistory()
  const { dispatch, error } = useStoreon<AuthState, AuthEvents>('error', 'isAuthenticated')

  const handleOnLoginClick = () => {
    dispatch('login', { username: 'test', password: 'test' })
  }

  return (
    <PublicPage>
      <Container>
        <SafePageView>
          <div>
            Login Page
          </div>
          <Button onClick={handleOnLoginClick}>Entrar</Button>
          <Button onClick={() => history.push('/register')}>Registra't</Button>
          <div>
            {error}
          </div>
        </SafePageView>
      </Container>
    </PublicPage>
  )
}

export { LoginPage }
