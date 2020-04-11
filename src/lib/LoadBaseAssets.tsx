import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'

import { SafePageView } from './molecules/SafePageView/SafePageView'
import { Container } from './atoms/Container/Container'
import { LearningUnit } from '../model/LearningUnit'
import { State } from '../store/state/State'
import { Events } from '../store/event/Events'
import { Success } from './helpers/Try'
import { Alert } from '../model/Alert'

import http from './services/http'

interface LoadBaseAssetsProps {
  children?: any
}

const LoadBaseAssets = ({ children }: LoadBaseAssetsProps) => {
  const [ isLoaded, setIsLoaded ] = useState<boolean>(false)

  const { dispatch } = useStoreon<State, Events>()

  useEffect(() => {
    const fetchLearningUnits = async () => {
      const responseTry = await http.get<LearningUnit[]>('http://aula.centralyze.io:1337/learning/learning-units')

      if (responseTry instanceof Success) {
        const response = responseTry as Success<LearningUnit[]>
        dispatch('learning/updateLearningUnits', response.value)
      } else {
        dispatch(
          'alert/showAlert',
          new Alert('Hi ha hagut un error durant la càrrega de la pàgina. Si us plau, torna-ho a provar en una estona.', 'error')
        )
      }

      setIsLoaded(true)
    }

    fetchLearningUnits()
  }, [])

  if (!isLoaded) {
    return (
      <SafePageView>
        <Container>
          Loading...
        </Container>
      </SafePageView>
    )
  }

  return <>{children}</>
}

export { LoadBaseAssets }
