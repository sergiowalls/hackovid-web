import React, { useState } from 'react'
import {Overlay, Tab, Tabs} from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'

import { Page } from '../../lib/molecules/Page/Page'
import { Container } from '../../lib/atoms/Container/Container'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { Row } from '../../lib/atoms/Row/Row'
import { Col } from '../../lib/atoms/Col/Col'
import { ClassList } from '../../lib/molecules/ClassList/ClassList'
import { Filters } from '../../model/Filters'
import { FloatingActionButton } from '../../lib/atoms/FloatingActionButton/FloatingActionButton'
import { ClassFilters } from '../../lib/molecules/ClassFilters/ClassFilters'

import './ClassesPage.scss'

type ClassesTabs = 'all' | 'mine'

const ClassesPage = () => {
  const [ selectedTab, setSelectedTab ] = useState<ClassesTabs>("all")
  const [ filters, setFilters ] = useState<Filters>(new Filters())
  const [isModalOpen, setIsModalOpen]=useState(false)

  const history = useHistory()

  const renderFilters = () => {
    return (
      <SafePageView>
        <h2>Filtres</h2>

        <ClassFilters onChange={(filters) => {
          setFilters(filters)
        }} onlyClickOne={false} />
      </SafePageView>
    )
  }

  const renderClassList = (tab: ClassesTabs) => {
    return (
      <ClassList filters={filters} />
    )
  }

  const handleOnTabChange = (newTab: ClassesTabs) => {
    const strings = newTab.split('classes-tab-')
    setSelectedTab(strings[1] as ClassesTabs)
  }

  return (
    <Page className="classes-page">
      <Container
        leftMarginClass="classes-page__container__left-margin"
        rightMarginClass="classes-page__container__right-margin"
      >
        <Row>
          <Col md={3} className="classes-page__filters-column">
            {renderFilters()}
          </Col>
          <Col md={9} className="classes-page__classes-column">
            <SafePageView>
              <div className="classes-page__tabs">
                <Tabs
                  id="classes-tab"
                  onChange={handleOnTabChange}
                  selectedTabId={`classes-tab-${selectedTab}`}
                  large={true}
                >
                  <Tab id="classes-tab-all" className="classes-page__tab" title="Totes les classes" />

                  <Tabs.Expander />
                  <Tabs.Expander />
                  <Tabs.Expander />

                  <Tab id="classes-tab-mine" className="classes-page__tab" title="Les meves classes" />
                </Tabs>
              </div>

              <h2>
                {selectedTab === 'all' && <>Totes les classes</>}
                {selectedTab === 'mine' && <>Les meves classes</>}
              </h2>

              <div className="classes-page__list">
                {renderClassList(selectedTab)}
              </div>

              <FloatingActionButton
                icon="plus"
                onClick={() => setIsModalOpen(true)}
                popoverText="Crear classe"
              />

              <Overlay isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
                <div className="learning-unit-selection">
                  <ClassFilters onlyClickOne={true} onClickOne={(learningUnit) => {
                    console.log(learningUnit)
                    history.push(`classes/new?learningUnit=${learningUnit.id}`)
                  }}/>
                </div>
              </Overlay>
            </SafePageView>
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export { ClassesPage }
