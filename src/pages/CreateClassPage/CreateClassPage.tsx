import React, { useState } from 'react'
import { Button, EditableText } from '@blueprintjs/core'

import { EditableClassSection } from '../../lib/molecules/ClassSection/EditableClassSection'
import { Container } from '../../lib/atoms/Container/Container'
import { ClassSection } from '../../model/ClassSection'

import './CreateClassPage.scss'

const CreateClassPage = () => {
  const [ sections, setSections ] = useState<ClassSection[]>([])
  const [ title, setTitle ] = useState<string>('')

  const updateSection = (index: number, section: ClassSection) => {
    setSections(sections.map((currentSection, currentIndex) => {
      if (index === currentIndex) {
        return section
      }
      return currentSection
    }))
  }

  const addSection = () => {
    setSections([...sections, { title: '', htmlContent: '' }])
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

      {sections.map((section, index) => (
        <div className="create-class__section" key={`editable-section-${index}`}>
          <EditableClassSection
            section={section}
            onChange={(section) => updateSection(index, section)}
          />
        </div>
      ))}

      <div className="create-class__actions">
        <Button onClick={addSection}>Afegir secció</Button>
      </div>
    </Container>
  )
}

export { CreateClassPage }
