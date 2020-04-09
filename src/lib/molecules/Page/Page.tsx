import React from 'react'
import { useStoreon } from 'storeon/react'
import { Redirect } from 'react-router-dom'
import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'

interface PageProps {
  children?: any
  className?: string
}

const Page = ({
  children,
  className
}: PageProps) => {
  const { auth: { isAuthenticated } } = useStoreon<State, Events>('auth')

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
