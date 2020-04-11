import React from 'react'

import { Class } from '../../../model/Class'

import './ClassListItem.scss'

interface ClassListItemProps {
  classEntity: Class
}

const ClassListItem = ({ classEntity }: ClassListItemProps) => {

  return (
    <div className="class-list-item">
      {classEntity.header.title}
    </div>
  )
}

export { ClassListItem }
