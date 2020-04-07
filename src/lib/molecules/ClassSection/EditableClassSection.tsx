import React, { useState } from 'react'
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react'
// @ts-ignore
import InlineEditor from '@ckeditor/ckeditor5-build-inline'

import './EditableClassSection.scss'

interface EditableClassSection {
  onBlur: (htmlContent: string) => void
}

const EditableClassSection = ({
  onBlur
}: EditableClassSection) => {
  const [data, setData] = useState<string>('')

  return (
    <div className="editable-class-section">
      <h3>Section</h3>
      <div className="editable-class-section__editor">
        <CKEditor
          config={{ language: 'ca' }}
          editor={InlineEditor}
          data={data}
          onChange={(event: any, editor: { getData: () => string }) => {
            setData(editor.getData())
          }}
          onBlur={() => onBlur(data)}
        />
      </div>
    </div>
  )
}

export { EditableClassSection }
