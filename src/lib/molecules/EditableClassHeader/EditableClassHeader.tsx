import React, { useEffect, useState } from 'react'
import { Elevation } from '@blueprintjs/core/lib/esm/common/elevation'
import { Card, Divider, EditableText } from '@blueprintjs/core'

import { ClassHeader } from '../../../model/ClassHeader'

import './EditableClassHeader.scss'
import { ClassViewType } from '../../../model/Class'
import moment from 'moment'
import { useStoreon } from 'storeon/react'
import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'
import {LearningUnit} from "../../../model/LearningUnit";

interface InputWrapperProps {
  label?: string
  children?: any
}

const InputWrapper = ({ children, label }: InputWrapperProps) => {
  return (
    <div className="editable-class-header__part">
      <div className="editable-class-header__part__label">
        {label}
      </div>
      <div className="editable-class-header__part__input-wrapper">
        {children}
      </div>
    </div>
  )
}

interface EditableClassHeaderProps {
  header: ClassHeader
  onChange: (header: ClassHeader) => void
  viewType: ClassViewType
  learningUnit: LearningUnit
}

const EditableClassHeader = ({
  header,
  onChange,
  viewType,
  learningUnit
}: EditableClassHeaderProps) => {
  const [ title, setTitle ] = useState<string>(header.title)

  const { auth } = useStoreon<State, Events>('auth')

  useEffect(() => {
    onChange(new ClassHeader(title, moment(), auth.user!!))
  }, [title])

  const renderContent = () => {
    return (
      <>
        <div className="editable-class-header__title">
          <EditableText
            placeholder="Títol de la classe..."
            value={title}
            onChange={setTitle}
            className="editable-class-header__title__editable"
            disabled={viewType !== ClassViewType.Editable}
          />
        </div>

        {viewType !== ClassViewType.Viewable &&
          <Divider className="editable-class-header__divider"/>
        }

        <InputWrapper label="Curs">
          {learningUnit.course}
        </InputWrapper>

        <InputWrapper label="Matèria">
          {learningUnit.subject}
        </InputWrapper>

        <InputWrapper label="Unitat didàctica">
          {learningUnit.title}
        </InputWrapper>
      </>
    )
  }

  if (viewType === ClassViewType.Viewable) {
    return (
      <div className="editable-class-header">
        {renderContent()}
      </div>
    )
  }

  return (
    <Card elevation={Elevation.ONE} className="editable-class-header">
      {renderContent()}
    </Card>
  )
}

export { EditableClassHeader }
