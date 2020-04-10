import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStoreon } from 'storeon/react'

import { SafePageView } from './molecules/SafePageView/SafePageView'
import { Container } from './atoms/Container/Container'
import { LearningUnit } from '../model/LearningUnit'
import { State } from '../store/state/State'
import { Events } from '../store/event/Events'

interface LoadBaseAssetsProps {
  children?: any
}

const LoadBaseAssets = ({ children }: LoadBaseAssetsProps) => {
  const [ isLoaded, setIsLoaded ] = useState<boolean>(false)

  const { dispatch } = useStoreon<State, Events>()

  useEffect(() => {
    axios.get<LearningUnit[]>('http://aula.centralyze.io:1337/learning/learning-units')
      .then((response) => {
        dispatch('learning/updateLearningUnits', response.data)

        setIsLoaded(true)
      })
      .catch(() => {
        setIsLoaded(true)
      })
  })

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
