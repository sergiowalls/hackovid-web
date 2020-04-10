import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Icon, InputGroup } from '@blueprintjs/core'
import axios from 'axios'

import { PublicPage } from '../../lib/molecules/PublicPage/PublicPage'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { Container } from '../../lib/atoms/Container/Container'
import { AuthForm } from '../../lib/molecules/AuthForm/AuthForm'

import './RegisterPage.scss'
import { useStoreon } from 'storeon/react'
import { State } from '../../store/state/State'
import { Events } from '../../store/event/Events'
import { Alert } from '../../model/Alert'
import { AuthToken } from '../../model/AuthToken'

const RegisterPage = () => {
  const [ username, setUsername ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ name, setName ] = useState<string>('')
  const [ institution, setInstitution ] = useState<string>('')

  const [ isRegistering, setIsRegistering ] = useState<boolean>(false)

  const { dispatch } = useStoreon<State, Events>()

  const register = () => {
    setIsRegistering(true)

    axios.post('http://aula.centralyze.io:1337/learning/user', {
      username,
      password,
      email: username,
      institution,
      subjects: [],
      courses: []
    }).then((response) => {
      if (response.status === 204) {
        axios.post<AuthToken>('http://aula.centralyze.io:1337/api-token-auth/', {
          username,
          password
        }).then((response) => {
          setIsRegistering(false)

          const data = response.data

          dispatch('alert/showAlert', new Alert('Identificació correcta. Hola <persona>!', 'success'))

          dispatch('auth/authenticate', data)
        }).catch(error => {
          setIsRegistering(false)
          dispatch(
            'alert/showAlert',
            new Alert('Hi ha hagut algun problema. Si us plau, torna a la pàgina d\'identificació i prova d\'autenticar-te', 'error')
          )
        })
      }
    }).catch(error => {
      setIsRegistering(false)
      dispatch(
        'alert/showAlert',
        new Alert('Hi ha hagut un error en el registre. Si us plau, comproveu els errors i torneu a provar.', 'error')
      )
    })
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
