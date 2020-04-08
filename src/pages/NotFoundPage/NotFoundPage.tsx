import React from 'react'
import { Button, NonIdealState } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'

import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'

const NotFoundPage = () => {
  const history = useHistory()

  return (
    <SafePageView>
      <NonIdealState
        title="404 - Ooops :("
        description="Aquesta pàgina no existeix."
        action={<Button onClick={() => history.push('/')}>Torna a l'inici</Button>}
      />
    </SafePageView>
  )
}

export { NotFoundPage }
