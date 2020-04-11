import React, { useState } from 'react'
import { Button } from '@blueprintjs/core'
import { Intent } from '@blueprintjs/core/lib/esm/common/intent'
import { useStoreon } from 'storeon/react'

import { Container } from '../../lib/atoms/Container/Container'
import { Row } from '../../lib/atoms/Row/Row'
import { Col } from '../../lib/atoms/Col/Col'
import { Page } from '../../lib/molecules/Page/Page'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { EditableClass } from '../../lib/molecules/EditableClass/EditableClass'
import { Class } from '../../model/Class'
import { Alert } from '../../model/Alert'
import { Events } from '../../store/event/Events'
import { State } from '../../store/state/State'
import http from '../../lib/services/http'
import { Success } from '../../lib/helpers/Try'
import urls from '../../lib/helpers/urls'

import './CreateClassPage.scss'

const CreateClassPage = () => {
  const [ classEntity, setClassEntity ] = useState<Class>(Class.instantiateNew())
  const { dispatch, auth } = useStoreon<State, Events>('auth')

  const createClass = async () => {
    const responseTry = await http.post<any>(urls.class.create(), {
      title: classEntity.header.title,
      learning_unit: 1,
      sections: classEntity.sections.map((section) => ({
        title: section.title,
        description: section.htmlContent,
        resources: [],
        learning_unit: 1
      }))
    }, auth)

    if (responseTry instanceof Success) {
      dispatch('alert/showAlert', new Alert('Classe creada correctament', 'success'))
    } else {
      dispatch('alert/showAlert', new Alert('Hi ha hagut un error en crear la classe.', 'error'))
    }
  }

  const renderFavoritesArea = () => {
    return (
      <SafePageView>
        <h2>Seccions guardades</h2>
      </SafePageView>
    )
  }

  return (
    <Page className="create-class">
      <Container leftMarginClass="create-class__container__left-margin">
        <Row>
          <Col md={8} className="create-class__editable-column">
            <Button
              intent={Intent.SUCCESS}
              onClick={createClass}
            >Guardar</Button>

            <EditableClass
              classEntity={classEntity}
              onChange={setClassEntity}
            />
          </Col>
          <Col md={4} className="create-class__favorites-column">
            {renderFavoritesArea()}
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export { CreateClassPage }
