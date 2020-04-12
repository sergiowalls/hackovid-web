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
import { useHistory, useLocation } from 'react-router-dom'
import {ClassResponse} from "../../model/http/ClassResponse";
import {assembleClassFrom} from "../../lib/services/responseAssemblers";
import {MySavedSections} from "../../lib/molecules/MySavedSections/MySavedSections";

const useQuery = () => new URLSearchParams(useLocation().search)

const CreateClassPage = () => {
  const { dispatch, auth, learning: { learningUnits } } = useStoreon<State, Events>('auth', 'learning')

  const [ classEntity, setClassEntity ] = useState<Class>(Class.instantiateNew(auth.user!!, learningUnits[0]))

  const learningUnitId = parseInt(useQuery().get('learningUnit')!!)
  const learningUnit = learningUnits.filter(l => l.id === learningUnitId)[0]

  let history = useHistory();

  const createClass = async () => {
    const responseTry = await http.post<ClassResponse>(urls.class.create(), {
      title: classEntity.header.title,
      learning_unit: learningUnit.id,
      sections: classEntity.sections.map((section) => ({
        title: section.title,
        description: section.htmlContent,
        resources: [],
        learning_unit: 1
      }))
    }, auth)

    if (responseTry instanceof Success) {
      dispatch('alert/showAlert', new Alert('Classe creada correctament', 'success'))
      let response = responseTry as Success<ClassResponse>;
      const classId = assembleClassFrom(response.value, learningUnits).id;
      history.push(`/classes/view?classId=${classId}`)
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
              learningUnit={learningUnit}
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
