import React from 'react'
import { Button, NonIdealState } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'

const NotFoundPage = () => {
  const history = useHistory()

  return (
    <NonIdealState
      title="404 - Ooops :("
      description="Aquesta pàgina no existeix."
      action={<Button onClick={() => history.push('/')}>Torna a l'inici</Button>}
    />
  )
}

export { NotFoundPage }
