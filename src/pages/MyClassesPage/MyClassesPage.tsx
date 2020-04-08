import React from 'react'

import { Page } from '../../lib/molecules/Page/Page'
import { Container } from '../../lib/atoms/Container/Container'
import { Button } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'

const MyClassesPage = () => {
  const history = useHistory()

  return (
    <Page>
      <Container>
        <SafePageView>
          Les meves classes

          <Button onClick={() => history.push('/classes/new')}>Crear classe</Button>
        </SafePageView>
      </Container>
    </Page>
  )
}

export { MyClassesPage }
