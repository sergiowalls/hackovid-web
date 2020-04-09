import React from 'react'
import { useStoreon } from 'storeon/react'
import { Button } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'

import { PublicPage } from '../../lib/molecules/PublicPage/PublicPage'
import { Container } from '../../lib/atoms/Container/Container'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { State } from '../../store/state/State'
import { Events } from '../../store/event/Events'

const LoginPage = () => {
  const history = useHistory()
  const { dispatch, auth: { error } } = useStoreon<State, Events>('auth')

  const handleOnLoginClick = () => {
    dispatch('auth/login', { username: 'test', password: 'test' })
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
