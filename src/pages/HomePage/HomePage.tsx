import React from 'react'

import { Page } from '../../lib/molecules/Page/Page'
import { Container } from '../../lib/atoms/Container/Container'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { Row } from '../../lib/atoms/Row/Row'
import { Col } from '../../lib/atoms/Col/Col'

import './HomePage.scss'

const HomePage = () => {

  const renderFilters = () => {
    return (
      <SafePageView>
        <h2>Filtres</h2>
      </SafePageView>
    )
  }

  const renderClassList = () => {
    return (
      <SafePageView>
        <h2>Classes</h2>
      </SafePageView>
    )
  }

  return (
    <Page className="home-page">
      <Container
        leftMarginClass="home-page__container__left-margin"
        rightMarginClass="home-page__container__right-margin"
      >
        <Row>
          <Col md={3} className="home-page__filters-column">
            {renderFilters()}
          </Col>
          <Col md={9} className="home-page__classes-column">
            {renderClassList()}
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export { HomePage }
