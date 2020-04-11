import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { ClassFilters } from '../../../model/ClassFilters'
import { Class } from '../../../model/Class'
import { ClassListItem } from '../ClassListItem/ClassListItem'

import './ClassList.scss'
import { useStoreon } from 'storeon/react'
import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'
import { Alert } from '../../../model/Alert'

interface ClassResponse {

}

interface ClassListProps {
  filters: ClassFilters
}

const ClassList = ({
  filters
}: ClassListProps) => {
  const [ classes, setClasses ] = useState<Class[]>([])

  const { dispatch } = useStoreon<State, Events>()

  useEffect(() => {
    axios.get('http://aula.centralyze.io:1337/learning/classes')
      .then(response => {
        console.log(response.data)
      })
      .catch(() => {
        dispatch(
          'alert/showAlert',
          new Alert('Hi ha hagut un error en carregar les classes. Si us plau, torna a provar en una estona.', 'error')
        )
      })
  }, [filters])

  return (
    <div className="class-list">
      {classes.map(classEntity => <ClassListItem classEntity={classEntity} />)}
    </div>
  )
}

export { ClassList }
