import React from 'react'
import { useStoreon } from 'storeon/react'
import { Button, Card, Divider, Elevation, FormGroup, InputGroup } from '@blueprintjs/core'
import { Link, useHistory } from 'react-router-dom'

import { PublicPage } from '../../lib/molecules/PublicPage/PublicPage'
import { Container } from '../../lib/atoms/Container/Container'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { State } from '../../store/state/State'
import { Events } from '../../store/event/Events'

import './LoginPage.scss'

interface CardSectionProps {
  children?: any
  className?: string
}

const CardSection = ({
  children,
  className
}: CardSectionProps) => {
  return (
    <div className={`card-section ${className}`}>
      {children}
    </div>
  )
}

const LoginPage = () => {
  const { dispatch } = useStoreon<State, Events>('auth')

  const handleOnLoginClick = () => {
    dispatch('auth/login', { username: 'test', password: 'test' })
  }

  return (
    <PublicPage className="login-page">
      <Container>
        <SafePageView>
          <Card className="login-page__card" elevation={Elevation.FOUR}>

            <CardSection className="login-page__card__header">
              Entra
            </CardSection>

            <Divider className="login-page__card-divider" />

            <CardSection>
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
            </CardSection>

            <CardSection className="login-page__card__actions">
              <Button
                large={true}
                onClick={handleOnLoginClick}
                icon="log-in"
              >Entrar</Button>
              <div className="login-page__card__actions__alternative">Encara no tens compte? <Link to="/register">Registra't</Link></div>
            </CardSection>
          </Card>
        </SafePageView>
      </Container>
    </PublicPage>
  )
}

export { LoginPage }
