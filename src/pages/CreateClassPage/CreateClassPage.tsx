import React, { useEffect, useState } from 'react'
import { Button, EditableText, Intent } from '@blueprintjs/core'

import { EditableClassSection } from '../../lib/molecules/ClassSection/EditableClassSection'
import { Container } from '../../lib/atoms/Container/Container'
import { ClassSection } from '../../model/ClassSection'
import { Row } from '../../lib/atoms/Row/Row'
import { Col } from '../../lib/atoms/Col/Col'

import './CreateClassPage.scss'
import { Page } from '../../lib/molecules/Page/Page'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'

const CreateClassPage = () => {
  const [ nextSectionId, setNextSectionId ] = useState<number>(0)
  const [ sections, setSections ] = useState<ClassSection[]>([])
  const [ title, setTitle ] = useState<string>('')

  useEffect(() => {
    addSection()
  }, [])

  const updateSection = (section: ClassSection) => {
    setSections(sections.map((currentSection) => {
      if (section.id === currentSection.id) {
        return section
      }
      return currentSection
    }))
  }

  const addSection = () => {
    setSections([...sections, { id: nextSectionId, title: '', htmlContent: '' }])
    setNextSectionId(nextSectionId + 1)
  }

  const deleteSection = (section: ClassSection) => {
    setSections(sections.filter((currentSection) => currentSection.id !== section.id))
  }

  const renderEditableArea = () => {
    return (
      <SafePageView className="create-class__editable">
        <div className="create-class__title">
          <EditableText
            placeholder="Títol de la classe..."
            value={title}
            onChange={setTitle}
            className="create-class__title__editable"
          />
        </div>

        {sections.map((section) => (
          <div className="create-class__section" key={`editable-section-${section.id}`}>
            <EditableClassSection
              renderRight={(
                <Button
                  icon="trash"
                  intent={Intent.DANGER}
                  onClick={() => deleteSection(section)}
                >
                  Esborrar secció
                </Button>
              )}
              section={section}
              onChange={updateSection}
            />
          </div>
        ))}

        <div className="create-class__actions">
          <Button
            onClick={addSection}
            icon="plus"
            intent={Intent.PRIMARY}
          >Afegir secció</Button>
        </div>
      </SafePageView>
    )
  }

  const renderFavoritesArea = () => {
    return (
      <SafePageView className="create-class__favorites">
        <h2>Seccions guardades</h2>
      </SafePageView>
    )
  }

  return (
    <Page>
      <Container className="create-class">
        <Row>
          <Col md={8} className="create-class__editable-column">
            {renderEditableArea()}
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
