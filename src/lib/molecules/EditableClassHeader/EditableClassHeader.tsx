import React, { useEffect, useState } from 'react'
import { Elevation } from '@blueprintjs/core/lib/esm/common/elevation'
import { Card, Divider, EditableText, TagInput } from '@blueprintjs/core'
import { ClassHeader } from '../../../model/ClassHeader'

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
  )
}

export { EditableClassHeader }
