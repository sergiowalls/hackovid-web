import React from 'react'

import { Page } from '../../lib/molecules/Page/Page'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { Container } from '../../lib/atoms/Container/Container'

const ProfilePage = () => {
  return (
    <Page>
      <SafePageView>
        <Container>
          Profile
        </Container>
      </SafePageView>
    </Page>
  )
}

export { ProfilePage }
