import React, { useState } from 'react'
import { Button } from '@blueprintjs/core'
import { Intent } from '@blueprintjs/core/lib/esm/common/intent'
import axios from 'axios'

import { Container } from '../../lib/atoms/Container/Container'
import { Row } from '../../lib/atoms/Row/Row'
import { Col } from '../../lib/atoms/Col/Col'
import { Page } from '../../lib/molecules/Page/Page'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { EditableClass } from '../../lib/molecules/EditableClass/EditableClass'
import { Class } from '../../model/Class'

import './CreateClassPage.scss'

const CreateClassPage = () => {
  const [ classEntity, setClassEntity ] = useState<Class>(Class.instantiateNew())

  const createClass = async () => {
    const response = await axios.request({
      url: 'http://aula.centralyze.io:1337/learning/class',
      data: {
        title: classEntity.header.title
      }
    })

    if (response.status === 201) {
      console.log("Success")
    } else {
      console.error("Error creating class")
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
