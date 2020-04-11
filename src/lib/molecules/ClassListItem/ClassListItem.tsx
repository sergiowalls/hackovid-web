import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'

import { Class } from '../../../model/Class'

import './ClassListItem.scss'

interface ClassListItemProps {
  classEntity: Class
}

const ClassListItem = ({ classEntity }: ClassListItemProps) => {

  return (
    <Card className="class-list-item" elevation={Elevation.TWO}>
      <div className="class-list-item__title">{classEntity.header.title}</div>

      <div className="class-list-item__sections">
        {classEntity.sections.map(section => (
          <div>{section.title}</div>
        ))}
      </div>
    </Card>
  )
}

export { ClassListItem }
