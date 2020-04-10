import React from 'react'
import { useStoreon } from 'storeon/react'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import { Link } from 'react-router-dom'

import { PublicPage } from '../../lib/molecules/PublicPage/PublicPage'
import { Container } from '../../lib/atoms/Container/Container'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { State } from '../../store/state/State'
import { Events } from '../../store/event/Events'
import { AuthForm } from '../../lib/molecules/AuthForm/AuthForm'

import './LoginPage.scss'

const LoginPage = () => {
  const { dispatch } = useStoreon<State, Events>('auth')

  const handleOnLoginClick = () => {
    dispatch('auth/login', { username: 'test', password: 'test' })
  }

  return (
    <PublicPage className="login-page">
      <Container>
        <SafePageView>
          <AuthForm
            header={<>Entra</>}
            actions={<div className="login-page__actions">
              <Button
                large={true}
                onClick={handleOnLoginClick}
              >Entra</Button>
              <div className="login-page__actions__alternative">
                Encara no tens compte? <Link to="/register">Registra't</Link>
              </div>
            </div>}
          >
            <FormGroup
              label="Adreça de correu electrònic"
              labelFor="email-input"
            >
              <InputGroup
                id="email-input"
                placeholder="exemple@exemple.com"
                type="email"
              />
            </FormGroup>
            <FormGroup
              label="Contrassenya"
              labelFor="password-input"
            >
              <InputGroup
                id="password-input"
                placeholder="****"
                type="password"
              />
            </FormGroup>
          </AuthForm>
        </SafePageView>
      </Container>
    </PublicPage>
  )
}

export { LoginPage }
