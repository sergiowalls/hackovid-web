import React, { useState } from 'react'

import { EditableClassSection } from '../../lib/molecules/ClassSection/EditableClassSection'
import { Container } from '../../lib/atoms/Container/Container'
import { ClassSection } from '../../model/ClassSection'
import { Button } from '@blueprintjs/core'

import './CreateClassPage.scss'

const CreateClassPage = () => {
  const [ sections, setSections ] = useState<ClassSection[]>([])

  const updateSection = (index: number, section: ClassSection) => {

  }

  const addSection = () => {
    setSections([...sections, { title: '', htmlContent: '' }])
  }

  return (
    <Container className="create-class">
      <h1>Nova classe</h1>

      {sections.map((section, index) => (
        <div className="create-class__section">
          <EditableClassSection
            section={section}
            onBlur={(section) => updateSection(index, section)}
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
