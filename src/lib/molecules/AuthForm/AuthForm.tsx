import React from 'react'
import { Card, Divider, Elevation, FormGroup, InputGroup } from '@blueprintjs/core'

import './AuthForm.scss'

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

interface AuthFormProps {
  header: any
  actions: any
}

const AuthForm = ({
  header,
  actions
}: AuthFormProps) => {
  return (
    <Card className="auth-form" elevation={Elevation.FOUR}>

      <CardSection className="auth-form__header">
        {header}
      </CardSection>

      <Divider className="auth-form__divider" />

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

      <CardSection className="auth-form__actions">
        {actions}
      </CardSection>
    </Card>
  )
}

AuthForm.Header = () => {

}

AuthForm.Actions = () => {

}

export { AuthForm }
