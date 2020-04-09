import React from 'react'
import { useStoreon } from 'storeon/react'
import { Redirect } from 'react-router-dom'

import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'

interface PublicPageProps {
  children?: any
  className?: string
}

const PublicPage = ({
  children,
  className
}: PublicPageProps) => {
  const { auth: { isAuthenticated } } = useStoreon<State, Events>('auth')

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
