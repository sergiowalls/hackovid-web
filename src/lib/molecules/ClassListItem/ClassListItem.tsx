import React from 'react'

import { Class } from '../../../model/Class'

import './ClassListItem.scss'
import { Card } from '@blueprintjs/core'

interface ClassListItemProps {
  classEntity: Class
}

const ClassListItem = ({ classEntity }: ClassListItemProps) => {

  return (
    <Card className="class-list-item">
      <h4>{classEntity.header.title}</h4>

      <div className="class-list-item__sections">
        {classEntity.sections.map(section => (
          <div>{section.title}</div>
        ))}
      </div>
    </Card>
  )
}

export { ClassListItem }
