import React from 'react'
import {Card, Elevation} from '@blueprintjs/core'
import {useHistory} from 'react-router-dom'

import {Class} from '../../../model/Class'

import './ClassListItem.scss'

interface ClassListItemProps {
  classEntity: Class
}

const ClassListItem = ({ classEntity }: ClassListItemProps) => {
  const history = useHistory()

  let createdAt = classEntity.header.createdAt.format("DD-MM-YYYY");
  let learningUnit = classEntity.learningUnit;
  return (
    <Card
      className="class-list-item"
      elevation={Elevation.TWO}
      onClick={() => history.push(`/classes/view?classId=${classEntity.id}`)}
    >
      <div className="class-list-item__header">
        <div className="class-list-item__header__left">
          <div className="class-list-item__title">{classEntity.header.title}</div>
          <div className="class-list-item__details">
            <span className="class-list-item__details__author">{classEntity.header.teacher.name}</span>
            |
            <span className="class-list-item__details__date">{createdAt}</span>
          </div>
        </div>
        <div className="class-list-item__header__right">
          <div className="class-list-item__learning__unit">{learningUnit.title}</div>
          <div className="class-list-item__learning__details">{learningUnit.course} - {learningUnit.subject}</div>
        </div>
      </div>

      <div className="class-list-item__sections">
        {classEntity.sections.map(section => (
          <div key={`class.${classEntity.id}.section.${section.id}`}>{section.title}</div>
        ))}
      </div>
    </Card>
  )
}

export { ClassListItem }
