import React, { useEffect, useState } from 'react'
import { Elevation } from '@blueprintjs/core/lib/esm/common/elevation'
import { Card, Divider, EditableText, TagInput } from '@blueprintjs/core'

import { ClassHeader } from '../../../model/ClassHeader'

import './EditableClassHeader.scss'

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
      <div className="editable-class-header__part editable-class-header__tags">
        <div className="editable-class-header__tags__label">
          Tags
        </div>
        <div className="editable-class-header__tags__input-wrapper">
          <TagInput
            values={tags}
            onAdd={values => setTags([...tags, ...values])}
            fill={true}
          />
        </div>
      </div>
    </Card>
  )
}

export { EditableClassHeader }
