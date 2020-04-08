import React, { useEffect, useState } from 'react'
import { Button, Intent } from '@blueprintjs/core'

import { EditableClassSection } from '../EditableClassSection/EditableClassSection'
import { SafePageView } from '../SafePageView/SafePageView'
import { ClassSection } from '../../../model/ClassSection'
import { EditableClassHeader } from '../EditableClassHeader/EditableClassHeader'
import { ClassHeader } from '../../../model/ClassHeader'

import './EditableClass.scss'
import { Class } from '../../../model/Class'

interface EditableClassProps {
  classEntity: Class
  onChange: (classEntity: Class) => void
}

const EditableClass = ({
  classEntity,
  onChange
}: EditableClassProps) => {
  const [ header, setHeader ] = useState<ClassHeader>(classEntity.header)
  const [ sections, setSections ] = useState<ClassSection[]>(classEntity.sections)

  useEffect(() => {
    onChange(new Class(header, sections))
  }, [header, sections])

  const getNextSectionId = () => {
    let maxSectionId = 0

    sections.forEach(section => {
      if (section.id > maxSectionId) maxSectionId = section.id
    })

    return maxSectionId + 1
  }

  const updateSection = (section: ClassSection) => {
    setSections(sections.map((currentSection) => {
      if (section.id === currentSection.id) {
        return section
      }
      return currentSection
    }))
  }

  const addSection = () => {
    setSections([...sections, new ClassSection(getNextSectionId(), '', '' )])
  }

  const deleteSection = (section: ClassSection) => {
    setSections(sections.filter((currentSection) => currentSection.id !== section.id))
  }

  return (
    <SafePageView className="editable-class">
      <h2>Nova classe</h2>

      <EditableClassHeader
        header={header}
        onChange={setHeader}
      />

      <h2 className="editable-class__part-title">Seccions</h2>

      {sections.map((section) => (
        <div className="editable-class__section" key={`editable-section-${section.id}`}>
          <EditableClassSection
            renderRight={sections.length > 1 && (
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

      <div className="editable-class__actions">
        <Button
          onClick={addSection}
          icon="plus"
          intent={Intent.PRIMARY}
        >Afegir secció</Button>
      </div>

      <h2 className="editable-class__part-title">Recursos</h2>
    </SafePageView>
  )
}

export { EditableClass }
