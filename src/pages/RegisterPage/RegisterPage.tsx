import React from 'react'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Icon, InputGroup } from '@blueprintjs/core'

import { PublicPage } from '../../lib/molecules/PublicPage/PublicPage'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { Container } from '../../lib/atoms/Container/Container'
import { AuthForm } from '../../lib/molecules/AuthForm/AuthForm'

import './RegisterPage.scss'

const RegisterPage = () => {
  return (
    <PublicPage className="register-page">
      <SafePageView>
        <Container>
          <AuthForm
            over={<Link to="/login"><Icon icon="chevron-left" />Tornar</Link>}
            header={<>Registra't</>}
            actions={(
              <div className="register-page__actions">
                <Button large={true}>Registra't</Button>
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
        </Container>
      </SafePageView>
    </PublicPage>
  )
}

export { RegisterPage }
