import React, { useEffect, useState } from 'react'
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react'
// @ts-ignore
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import { Card, EditableText, Elevation } from '@blueprintjs/core'

import { ClassSection } from '../../../model/ClassSection'
import { ClassViewType } from '../../../model/Class'

import './EditableClassSection.scss'

interface CKEditorEditorInterface {
  getData: () => string
  keystrokes: {
    set: (key: string | (string | number)[], handler: (keyEvtData: any, cancel: any) => void) => void
  }
}

interface EditableClassSectionProps {
  section: ClassSection
  onChange: (section: ClassSection) => void
  renderRight?: any
  viewType: ClassViewType
}

const EditableClassSection = ({
  section,
  onChange,
  renderRight,
  viewType
}: EditableClassSectionProps) => {
  const [titleData, setTitleData] = useState<string>(section.title)
  const [contentData, setContentData] = useState<string>(section.htmlContent)

  useEffect(() => {
    onChange(new ClassSection(
      section.id,
      titleData,
      contentData
    ))
  }, [titleData, contentData])

  const renderContent = () => {
    return (
      <>
        <div className="editable-class-section__header">
          <div className="editable-class-section__title">
            <EditableText
              placeholder="Títol de la secció..."
              value={titleData}
              onChange={setTitleData}
              className="editable-class-section__title__editable"
              disabled={viewType !== ClassViewType.Editable}
            />
          </div>

          <div className="editable-class-section__header__right">
            {renderRight}
          </div>
        </div>
        {viewType === ClassViewType.Editable &&
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
        }
        {viewType !== ClassViewType.Editable &&
        <div
            className="editable-class-section__content"
            dangerouslySetInnerHTML={{ __html: contentData }}
        />
        }
      </>
    )
  }

  if (viewType === ClassViewType.Viewable) {
    return (
      <div className="editable-class-section">
        {renderContent()}
      </div>
    )
  }

  return (
    <Card
      className="editable-class-section"
      elevation={Elevation.ONE}
    >
      {renderContent()}
    </Card>
  )
}

export { EditableClassSection }
