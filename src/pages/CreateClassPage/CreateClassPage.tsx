import React, { useEffect, useState } from 'react'
import { Button, EditableText, Icon, Intent } from '@blueprintjs/core'

import { EditableClassSection } from '../../lib/molecules/ClassSection/EditableClassSection'
import { Container } from '../../lib/atoms/Container/Container'
import { ClassSection } from '../../model/ClassSection'

import './CreateClassPage.scss'
import { Row } from '../../lib/atoms/Row/Row'
import { Col } from '../../lib/atoms/Col/Col'

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
      <div className="create-class__editable">
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
      </div>
    )
  }

  const renderFavoritesArea = () => {
    return (
      <div className="create-class__favorites">
        <h1>Seccions guardades</h1>
      </div>
    )
  }

  return (
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
  )
}

export { CreateClassPage }
