import React, { useEffect, useState } from 'react'
import { Button, EditableText, Icon, Intent } from '@blueprintjs/core'

import { EditableClassSection } from '../../lib/molecules/ClassSection/EditableClassSection'
import { Container } from '../../lib/atoms/Container/Container'
import { ClassSection } from '../../model/ClassSection'

import './CreateClassPage.scss'

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

  return (
    <Container className="create-class">
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
    </Container>
  )
}

export { CreateClassPage }
