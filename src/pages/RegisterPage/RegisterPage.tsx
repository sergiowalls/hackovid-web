import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Icon, InputGroup } from '@blueprintjs/core'
import { useStoreon } from 'storeon/react'

import { PublicPage } from '../../lib/molecules/PublicPage/PublicPage'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { Container } from '../../lib/atoms/Container/Container'
import { AuthForm } from '../../lib/molecules/AuthForm/AuthForm'
import { State } from '../../store/state/State'
import { Events } from '../../store/event/Events'
import { Alert } from '../../model/Alert'
import { AuthToken } from '../../model/AuthToken'
import http from '../../lib/services/http'
import { Success } from '../../lib/helpers/Try'

import './RegisterPage.scss'
import urls from '../../lib/helpers/urls'

const RegisterPage = () => {
  const [ username, setUsername ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ name, setName ] = useState<string>('')
  const [ institution, setInstitution ] = useState<string>('')

  const [ isRegistering, setIsRegistering ] = useState<boolean>(false)

  const { dispatch } = useStoreon<State, Events>()

  const register = () => {
    const doRegister = async () => {
      setIsRegistering(true)

      const registerResponseTry = await http.post(urls.register(), {
        username,
        password,
        email: username,
        first_name: name,
        institution,
        subjects: [],
        courses: []
      })

      if (registerResponseTry instanceof Success) {
        const loginResponseTry = await http.post(urls.login(), {
          username,
          password
        })

        if (loginResponseTry instanceof Success) {
          setIsRegistering(false)

          const loginResponse = loginResponseTry as Success<AuthToken>

          dispatch('alert/showAlert', new Alert('Identificació correcta. Hola [persona]!', 'success'))

          dispatch('auth/authenticate', loginResponse.value)
        }
      } else {
        setIsRegistering(false)
        dispatch(
          'alert/showAlert',
          new Alert('Hi ha hagut un error en el registre. Si us plau, comproveu els errors i torneu a provar.', 'error')
        )
      }
    }

    doRegister()
  }

  return (
    <PublicPage className="register-page">
      <SafePageView>
        <Container>
          <AuthForm
            over={<Link to="/login"><Icon icon="chevron-left" />Tornar</Link>}
            header={<>Registra't</>}
            actions={(
              <div className="register-page__actions">
                <Button
                  large={true}
                  onClick={register}
                  loading={isRegistering}
                >Registra't</Button>
              </div>
            )}
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
              label="Contrasenya"
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
            <FormGroup
              label="Nom"
              labelFor="name-input"
            >
              <InputGroup
                id="name-input"
                placeholder="Pau Torrents"
                value={name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
              />
            </FormGroup>
            <FormGroup
              label="Institució"
              labelFor="institution-input"
            >
              <InputGroup
                id="institution-input"
                placeholder="Escola Pompeu Fabra"
                value={institution}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setInstitution(event.target.value)}
              />
            </FormGroup>
          </AuthForm>
        </Container>
      </SafePageView>
    </PublicPage>
  )
}

export { RegisterPage }
