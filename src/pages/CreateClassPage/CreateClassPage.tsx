import React, { useState } from 'react'
import { Button } from '@blueprintjs/core'
import { Intent } from '@blueprintjs/core/lib/esm/common/intent'
import { useStoreon } from 'storeon/react'
import axios from 'axios'

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

import './CreateClassPage.scss'

const CreateClassPage = () => {
  const [ classEntity, setClassEntity ] = useState<Class>(Class.instantiateNew())
  const { dispatch } = useStoreon<State, Events>()

  const createClass = async () => {
    await axios.request({
      url: 'http://aula.centralyze.io:1337/learning/class',
      method: 'POST',
      data: {
        title: classEntity.header.title
      }
    }).then(() => {
      console.log("Success")
      dispatch('alert/showAlert', new Alert('Classe creada correctament', 'success'))
    }).catch(() => {
      console.log("Error")
      dispatch('alert/showAlert', new Alert('Hi ha hagut un error en crear la classe.', 'error'))
    })
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
