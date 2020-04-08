import React, { useEffect, useState } from 'react'
import { Elevation } from '@blueprintjs/core/lib/esm/common/elevation'
import { Card, Divider, EditableText, TagInput } from '@blueprintjs/core'

import { ClassHeader } from '../../../model/ClassHeader'

import './EditableClassHeader.scss'

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
}

const EditableClassHeader = ({
  header,
  onChange
}: EditableClassHeaderProps) => {
  const [ title, setTitle ] = useState<string>(header.title)
  const [ tags, setTags ] = useState<string[]>(header.tags)

  useEffect(() => {
    onChange(new ClassHeader(title, tags))
  }, [title, tags])

  return (
    <Card elevation={Elevation.ONE} className="editable-class-header">
      <div className="editable-class-header__title">
        <EditableText
          placeholder="Títol de la classe..."
          value={title}
          onChange={setTitle}
          className="editable-class-header__title__editable"
        />
      </div>

      <Divider className="editable-class-header__divider" />

      <InputWrapper label="Curs">
        Curs
      </InputWrapper>

      <InputWrapper label="Tags">
        <TagInput
          values={tags}
          onAdd={values => setTags([...tags, ...values])}
          fill={true}
        />
      </InputWrapper>

    </Card>
  )
}

export { EditableClassHeader }
