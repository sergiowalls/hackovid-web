import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'

import { Filters } from '../../../model/Filters'
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
  filters: Filters
}

const ClassList = ({
  filters
}: ClassListProps) => {
  const [ classes, setClasses ] = useState<Class[]>([])

  const { dispatch, learning: { learningUnits } } = useStoreon<State, Events>('auth', 'learning')

  useEffect(() => {
    const fetchClasses = async () => {
      if (!filters || !filters.learningUnits || filters.learningUnits.length === 0) {
        const responseTry = await http.get<ClassResponse[]>(urls.class.getAll())

        if (responseTry instanceof Success) {
          const response = responseTry as Success<ClassResponse[]>
          setClasses(response.value.map((classResponse) => assembleClassFrom(classResponse, learningUnits)))
        } else {
          dispatch(
            'alert/showAlert',
            new Alert('Hi ha hagut un error en carregar les classes. Si us plau, torna a provar en una estona.', 'error')
          )
        }
      } else {

        const promises = filters.learningUnits!!.map(learningUnit => new Promise<ClassResponse[]>((resolve, reject) => {
          return http.get<ClassResponse[]>(urls.class.getByLearningUnit(learningUnit))
        }))

        const responses = await Promise.all<ClassResponse[]>(promises)

        const newClasses: Class[] = []

        responses.forEach((classesResponse) => {
          classesResponse.forEach(classResponse => {
            newClasses.push(assembleClassFrom(classResponse, learningUnits))
          })
        })

        setClasses(newClasses)
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
