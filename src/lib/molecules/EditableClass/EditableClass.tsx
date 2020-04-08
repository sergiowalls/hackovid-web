import React, { useEffect, useState } from 'react'
import { Button, Card, Divider, EditableText, Intent, TagInput } from '@blueprintjs/core'
import { Elevation } from '@blueprintjs/core/lib/esm/common/elevation'

import { EditableClassSection } from '../EditableClassSection/EditableClassSection'
import { SafePageView } from '../SafePageView/SafePageView'
import { ClassSection } from '../../../model/ClassSection'

import './EditableClass.scss'

const EditableClass = () => {
  const [ nextSectionId, setNextSectionId ] = useState<number>(0)
  const [ sections, setSections ] = useState<ClassSection[]>([])
  const [ title, setTitle ] = useState<string>('')
  const [ tags, setTags ] = useState<string[]>([])

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
    <SafePageView className="editable-class">
      <h2>Nova classe</h2>

      <Card elevation={Elevation.ONE}>
        <div className="editable-class__title">
          <EditableText
            placeholder="Títol de la classe..."
            value={title}
            onChange={setTitle}
            className="editable-class__title__editable"
          />
        </div>
        <Divider />
        <div className="editable-class__tags">
          <div className="editable-class__tags__label">
            Tags
          </div>
          <div className="editable-class__tags__input-wrapper">
            <TagInput
              values={tags}
              onAdd={values => setTags([...tags, ...values])}
              fill={true}
            />
          </div>
        </div>
      </Card>

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
