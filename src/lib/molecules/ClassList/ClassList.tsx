import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStoreon } from 'storeon/react'

import { ClassFilters } from '../../../model/ClassFilters'
import { Class } from '../../../model/Class'
import { ClassListItem } from '../ClassListItem/ClassListItem'
import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'
import { Alert } from '../../../model/Alert'
import { ClassHeader } from '../../../model/ClassHeader'
import { ClassSection } from '../../../model/ClassSection'

import './ClassList.scss'
import { ClassResponse } from '../../../model/http/ClassResponse'
import { assembleClassFrom } from '../../services/responseAssemblers'

interface ClassListProps {
  filters: ClassFilters
}

const ClassList = ({
  filters
}: ClassListProps) => {
  const [ classes, setClasses ] = useState<Class[]>([])

  const { dispatch } = useStoreon<State, Events>()

  useEffect(() => {
    const url = 'http://aula.centralyze.io:1337/learning/classes'
      + (filters.learningUnits ? '?learning-unit=1' : '')

    axios.get<ClassResponse[]>(url)
      .then(response => {
        console.log(response.data)

        setClasses(response.data.map(assembleClassFrom))
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
      {classes.map(classEntity => (
        <div className="class-list__item">
          <ClassListItem classEntity={classEntity} />
        </div>
      ))}
    </div>
  )
}

export { ClassList }
