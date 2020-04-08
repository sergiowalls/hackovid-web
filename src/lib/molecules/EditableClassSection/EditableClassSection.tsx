import React, { useEffect, useState } from 'react'
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react'
// @ts-ignore
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import { Card, EditableText, Elevation } from '@blueprintjs/core'

import { ClassSection } from '../../../model/ClassSection'

import './EditableClassSection.scss'

interface CKEditorEditorInterface {
  getData: () => string
  keystrokes: {
    set: (key: string | (string | number)[], handler: (keyEvtData: any, cancel: any) => void) => void
  }
}

interface EditableClassSection {
  section: ClassSection
  onChange: (section: ClassSection) => void
  renderRight?: any
}

const EditableClassSection = ({
  section,
  onChange,
  renderRight
}: EditableClassSection) => {
  const [titleData, setTitleData] = useState<string>(section.title)
  const [contentData, setContentData] = useState<string>(section.htmlContent)

  useEffect(() => {
    onChange({
      id: section.id,
      title: titleData,
      htmlContent: contentData
    })
  }, [titleData, contentData])

  return (
    <Card
      className="editable-class-section"
      elevation={Elevation.ONE}
    >
      <div className="editable-class-section__header">
        <div className="editable-class-section__title">
          <EditableText
            placeholder="Títol de la secció..."
            value={titleData}
            onChange={setTitleData}
            className="editable-class-section__title__editable"
          />
        </div>

        <div className="editable-class-section__header__right">
          {renderRight}
        </div>
      </div>
      <div className="editable-class-section__editor">
        <CKEditor
          config={{ language: 'ca' }}
          editor={InlineEditor}
          data={contentData}
          onChange={(event: any, editor: CKEditorEditorInterface) => {
            setContentData(editor.getData())
          }}
        />
      </div>
    </Card>
  )
}

export { EditableClassSection }
