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
  over?: any
  header: any
  actions: any
  children: any
}

const AuthForm = ({
  over,
  header,
  actions,
  children
}: AuthFormProps) => {
  return (
    <div className="auth-form">
      <div className="auth-form__over">
        {over &&
          <>{over}</>
        }
      </div>
      <Card className="auth-form__container" elevation={Elevation.FOUR}>

        <CardSection className="auth-form__header">
          {header}
        </CardSection>

        <Divider className="auth-form__divider" />

        <CardSection>
          {children}
        </CardSection>

        <CardSection>
          {actions}
        </CardSection>
      </Card>
    </div>
  )
}

AuthForm.Header = () => {

}

AuthForm.Actions = () => {

}

export { AuthForm }
