import React, { useEffect, useState } from 'react'
import { Button, Icon, Intent, Popover } from '@blueprintjs/core'

import { EditableClassSection } from '../EditableClassSection/EditableClassSection'
import { SafePageView } from '../SafePageView/SafePageView'
import { ClassSection } from '../../../model/ClassSection'
import { EditableClassHeader } from '../EditableClassHeader/EditableClassHeader'
import { ClassHeader } from '../../../model/ClassHeader'
import { Class, ClassViewType } from '../../../model/Class'

import './EditableClass.scss'
import http from "../../services/http";
import urls from "../../helpers/urls";
import {useStoreon} from "storeon/react";
import {State} from "../../../store/state/State";
import {Events} from "../../../store/event/Events";
import {Success} from "../../helpers/Try";
import {Alert} from "../../../model/Alert";
import {LearningUnit} from "../../../model/LearningUnit";

interface EditableClassProps {
  classEntity: Class
  onChange?: (classEntity: Class) => void
  viewType: ClassViewType
  title?: string
  learningUnit: LearningUnit
}

const EditableClass = ({
  classEntity,
  onChange,
  viewType,
  title,
  learningUnit
}: EditableClassProps) => {
  const [ header, setHeader ] = useState<ClassHeader>(classEntity.header)
  const [ sections, setSections ] = useState<ClassSection[]>(classEntity.sections)
  const [ openPopover, setOpenPopover ] = useState<number | null>(null)

  const { dispatch, auth, learning: { learningUnits } } = useStoreon<State,Events>('auth', 'learning')

  useEffect(() => {
    if (onChange) onChange(new Class(classEntity.id, learningUnits[0], header, sections))
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

  const onSectionSaveClick = async (section: ClassSection) => {
    const responseTry = await http.post<any>(urls.savedSections.save(section.id),null, auth)

    if (responseTry instanceof Success) {
      dispatch('alert/showAlert', new Alert('Secció guardada correctament', 'success'))
    } else {
      dispatch('alert/showAlert', new Alert('Hi ha hagut un error en guardar la secció. Torna a provar en uns instants.', 'error'))
    }
  }

  const renderSectionRight = (section: ClassSection) => {
    if (viewType === ClassViewType.Editable) {
      return sections.length > 1 && (
        <Button
          icon="trash"
          intent={Intent.DANGER}
          onClick={() => deleteSection(section)}
        >
          Esborrar secció
        </Button>
      )
    } else if (viewType === ClassViewType.Saveable) {
      return (
        <div
          onMouseEnter={() => setOpenPopover(section.id)}
          onMouseLeave={() => setOpenPopover(null)}
        >
          <Popover isOpen={openPopover === section.id}>
            <Button minimal={true} intent={Intent.NONE} onClick={() => onSectionSaveClick(section)}>
              <Icon icon="heart" iconSize={20} />
            </Button>
            <div className="editable-class__section__save-popover">
              Guardar secció a favorits
            </div>
          </Popover>
        </div>
      )
    }
  }

  return (
    <SafePageView className="editable-class">
      {title &&
        <h2>{title}</h2>
      }

      <EditableClassHeader
        header={header}
        onChange={setHeader}
        viewType={viewType}
        learningUnit={learningUnit}
      />

      {viewType !== ClassViewType.Viewable &&
        <h2 className="editable-class__part-title">Seccions</h2>
      }

      {sections.map((section) => (
        <div className="editable-class__section" key={`editable-section-${section.id}`}>
          <EditableClassSection
            renderRight={renderSectionRight(section)}
            section={section}
            onChange={updateSection}
            viewType={viewType}
          />
        </div>
      ))}

      {viewType === ClassViewType.Editable &&
        <div className="editable-class__actions">
          <Button
              onClick={addSection}
              icon="plus"
              intent={Intent.PRIMARY}
          >Afegir secció</Button>
        </div>
      }
    </SafePageView>
  )
}

export { EditableClass }
