import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'

import { ClassFilters } from '../../../model/ClassFilters'
import { Class } from '../../../model/Class'
import { ClassListItem } from '../ClassListItem/ClassListItem'
import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'
import { Alert } from '../../../model/Alert'
import { ClassResponse } from '../../../model/http/ClassResponse'
import { assembleClassFrom } from '../../services/responseAssemblers'
import http from '../../services/http'
import { Success } from '../../helpers/Try'
import urls from '../../helpers/urls'

import './ClassList.scss'

interface ClassListProps {
  filters: ClassFilters
}

const ClassList = ({
  filters
}: ClassListProps) => {
  const [ classes, setClasses ] = useState<Class[]>([])

  const { dispatch } = useStoreon<State, Events>('auth')

  useEffect(() => {
    const fetchClasses = async () => {
      const responseTry = await http.get<ClassResponse[]>(urls.class.getByFilter(filters))

      if (responseTry instanceof Success) {
        const response = responseTry as Success<ClassResponse[]>
        setClasses(response.value.map(assembleClassFrom))
      } else {
        dispatch(
          'alert/showAlert',
          new Alert('Hi ha hagut un error en carregar les classes. Si us plau, torna a provar en una estona.', 'error')
        )
      }
    }
    fetchClasses()
  }, [filters])

  return (
    <div className="class-list">
      {classes.map(classEntity => (
        <div className="class-list__item" key={`class.${classEntity.id}`}>
          <ClassListItem classEntity={classEntity} />
        </div>
      ))}
    </div>
  )
}

export { ClassList }
