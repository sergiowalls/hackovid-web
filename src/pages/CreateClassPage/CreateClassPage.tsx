import React from 'react'
import { EditableClassSection } from '../../lib/molecules/ClassSection/EditableClassSection'
import { Container } from '../../lib/atoms/Container/Container'

const CreateClassPage = () => {
  const handleOnSectionBlur = (htmlContent: string) => {

  }

  return (
    <Container>
      <h2>Create class</h2>

      <h3>Section</h3>

      <EditableClassSection onBlur={handleOnSectionBlur} />
    </Container>
  )
}

export { CreateClassPage }
