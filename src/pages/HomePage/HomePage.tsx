import React from 'react'

import { Page } from '../../lib/molecules/Page/Page'
import { Container } from '../../lib/atoms/Container/Container'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'

const HomePage = () => {
  return (
    <Page>
      <Container>
        <SafePageView>
          Pàgina principal
        </SafePageView>
      </Container>
    </Page>
  )
}

export { HomePage }
