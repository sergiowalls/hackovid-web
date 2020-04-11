import React, { ChangeEvent, useState } from 'react'
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
import { AuthToken } from '../../model/AuthToken'
import { Alert } from '../../model/Alert'
import http from '../../lib/services/http'
import { Success } from '../../lib/helpers/Try'
import urls from '../../lib/helpers/urls'

const LoginPage = () => {
  const [ username, setUsername ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const [ isLoging, setIsLoging ] = useState<boolean>(false)

  const { dispatch } = useStoreon<State, Events>('auth')

  const login = () => {
    const doLogin = async () => {
      setIsLoging(true)

      const responseTry = await http.post<AuthToken>(urls.login(), {
        username,
        password
      })

      if (responseTry instanceof Success) {
        setIsLoging(false)

        const response = responseTry as Success<AuthToken>

        dispatch(
          'alert/showAlert',
          new Alert('Identificació correcta. Hola <persona>!', 'success')
        )

        dispatch('auth/authenticate', response.value)
      } else {
        setIsLoging(false)
        dispatch(
          'alert/showAlert',
          new Alert('L\'usuari i/o la contrasenya són incorrectes.', 'error')
        )
      }
    }
    doLogin()
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
                onClick={login}
                loading={isLoging}
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
                value={username}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
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
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              />
            </FormGroup>
          </AuthForm>
        </SafePageView>
      </Container>
    </PublicPage>
  )
}

export { LoginPage }
