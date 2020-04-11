import React from 'react'
import { Alignment, Button, Intent, Navbar } from '@blueprintjs/core'
import { useStoreon } from 'storeon/react'

import { Container } from '../../atoms/Container/Container'
import { AppMenuItem } from '../AppMenuItem/AppMenuItem'
import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'

import './AppNavigation.scss'
import { AppMenuButton } from '../AppMenuButton/AppMenuButton'

const AppNavigation = () => {
  const { dispatch, auth: { isAuthenticated } } = useStoreon<State, Events>('auth')

  if (!isAuthenticated) {
    return null
  }

  return (
    <Navbar className="app-navigation">
      <Container>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Aula</Navbar.Heading>

          <Navbar.Divider />

          <AppMenuItem icon="home" path="/classes">
            Classes
          </AppMenuItem>
          <AppMenuItem icon="inbox" path="/profile">
            Perfil
          </AppMenuItem>
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <AppMenuButton
            icon="log-out"
            onClick={() => dispatch('auth/logout')}
          >
            Sortir
          </AppMenuButton>
        </Navbar.Group>
      </Container>
    </Navbar>
  )
}

export { AppNavigation }
