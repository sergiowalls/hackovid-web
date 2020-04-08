import React from 'react'
import { Button } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'

import { PublicPage } from '../../lib/molecules/PublicPage/PublicPage'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { Container } from '../../lib/atoms/Container/Container'

const RegisterPage = () => {
  const history = useHistory()

  return (
    <PublicPage>
      <SafePageView>
        <Container>
          <div>
            Register page
          </div>

          <Button onClick={() => history.goBack()}>Enrere</Button>
        </Container>
      </SafePageView>
    </PublicPage>
  )
}

export { RegisterPage }
