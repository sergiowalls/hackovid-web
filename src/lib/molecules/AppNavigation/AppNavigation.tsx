import React from 'react'
import { Alignment, Button, Intent, Navbar } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'
import { useStoreon } from 'storeon/react'

import { Container } from '../../atoms/Container/Container'
import { AuthEvents, AuthState } from '../../../store/auth'

import './AppNavigation.scss'

const AppNavigation = () => {
  const history = useHistory()
  const { dispatch, isAuthenticated } = useStoreon<AuthState, AuthEvents>('isAuthenticated')

  if (!isAuthenticated) {
    return null
  }

  return (
    <Navbar className="app-navigation">
      <Container>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Aula</Navbar.Heading>

          <Navbar.Divider />

          <Button
            minimal={true}
            icon="home"
            onClick={() => history.push('/')}
          >
            Inici
          </Button>
          <Button
            minimal={true}
            icon="inbox"
            onClick={() => history.push('/classes')}
          >
            Classes
          </Button>
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            minimal={true}
            intent={Intent.DANGER}
            rightIcon="log-out"
            onClick={() => dispatch('logout')}
          >
            Sortir
          </Button>
        </Navbar.Group>
      </Container>
    </Navbar>
  )
}

export { AppNavigation }
