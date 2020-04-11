import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Class } from '../../model/Class'

import './ClassPage.scss'
import { ClassResponse } from '../../model/http/ClassResponse'
import { assembleClassFrom } from '../../lib/services/responseAssemblers'
import { useStoreon } from 'storeon/react'
import { State } from '../../store/state/State'
import { Events } from '../../store/event/Events'
import { Alert } from '../../model/Alert'
import { Page } from '../../lib/molecules/Page/Page'
import { SafePageView } from '../../lib/molecules/SafePageView/SafePageView'
import { Container } from '../../lib/atoms/Container/Container'
import http from '../../lib/services/http'
import { Success } from '../../lib/helpers/Try'
import urls from '../../lib/helpers/urls'

const useQuery = () => new URLSearchParams(useLocation().search)

const ClassPage = () => {
  const [ classEntity, setClassEntity ] = useState<Class | null>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const { dispatch } = useStoreon<State, Events>()

  const query = useQuery()

  useEffect(() => {
    const fetchClass = async () => {
      setIsLoading(true)

      const responseTry = await http.get<ClassResponse>(urls.class.getById(query.get('classId')))

      if (responseTry instanceof Success) {
        setIsLoading(false)

        const response = responseTry as Success<ClassResponse>
        setClassEntity(assembleClassFrom(response.value))
      } else {
        setIsLoading(false)
        dispatch(
          'alert/showAlert',
          new Alert('Hi ha hagut un error en carregar la classe. Torna-ho a provar en uns instants', 'error')
        )
      }
    }
    fetchClass()
  }, [query.get('classId')])

  return (
    <Page className="class-page">
      <SafePageView>
        <Container>
          {isLoading && <div>Carregant...</div>}
          {!isLoading && classEntity && (
            <div>
              Classe: {classEntity!!.header.title}
            </div>
          )}
        </Container>
      </SafePageView>
    </Page>
  )
}

export { ClassPage }