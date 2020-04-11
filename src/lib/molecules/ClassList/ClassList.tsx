import React, { useEffect, useState } from 'react'

import { ClassFilters } from '../../../model/ClassFilters'
import { Class } from '../../../model/Class'

import './ClassList.scss'
import { ClassListItem } from '../ClassListItem/ClassListItem'

interface ClassListProps {
  filters: ClassFilters
}

const ClassList = ({
  filters
}: ClassListProps) => {
  const [ classes, setClasses ] = useState<Class[]>([])

  useEffect(() => {

  }, [filters])

  return (
    <div className="class-list">
      {classes.map(classEntity => <ClassListItem classEntity={classEntity} />)}
    </div>
  )
}

export { ClassList }
