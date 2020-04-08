import React from 'react'
import { useStoreon } from 'storeon/react'
import { AuthEvents, AuthState } from '../../../store/auth'
import { Redirect } from 'react-router-dom'

interface PublicPageProps {
  children?: any
  className?: string
}

const PublicPage = ({
  children,
  className
}: PublicPageProps) => {
  const { isAuthenticated } = useStoreon<AuthState, AuthEvents>('isAuthenticated')

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export { PublicPage }
