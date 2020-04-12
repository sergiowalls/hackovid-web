import React, { useState } from 'react'
import { useStoreon } from 'storeon/react'

import { Container } from '../../lib/atoms/Container/Container'
import { Row } from '../../lib/atoms/Row/Row'
import { Col } from '../../lib/atoms/Col/Col'
import { Page } from '../../lib/molecules/Page/Page'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { EditableClass } from '../../lib/molecules/EditableClass/EditableClass'
import { Class, ClassViewType } from '../../model/Class'
import { Alert } from '../../model/Alert'
import { Events } from '../../store/event/Events'
import { State } from '../../store/state/State'
import http from '../../lib/services/http'
import { Success } from '../../lib/helpers/Try'
import urls from '../../lib/helpers/urls'

import './CreateClassPage.scss'
import { FloatingActionButton } from '../../lib/atoms/FloatingActionButton/FloatingActionButton'
import {MySavedSections} from "../../lib/molecules/MySavedSections/MySavedSections";

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
        <MySavedSections/>



      </SafePageView>
    )
  }

  return (
    <Page className="create-class">
      <Container leftMarginClass="create-class__container__left-margin">
        <Row>
          <Col md={8} className="create-class__editable-column">
            <EditableClass
              classEntity={classEntity}
              onChange={setClassEntity}
              viewType={ClassViewType.Editable}
              title="Nova classe"
            />

            <FloatingActionButton
              icon="floppy-disk"
              onClick={createClass}
              popoverText="Guardar"
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
