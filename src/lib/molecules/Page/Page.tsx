import React from 'react'
import { useStoreon } from 'storeon/react'
import { AuthEvents, AuthState } from '../../../store/auth'
import { Redirect } from 'react-router-dom'

interface PageProps {
  children?: any
  className?: string
}

const Page = ({
  children,
  className
}: PageProps) => {
  const { isAuthenticated } = useStoreon<AuthState, AuthEvents>('isAuthenticated')

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export { Page }
