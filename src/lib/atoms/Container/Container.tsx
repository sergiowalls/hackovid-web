import React, { ReactElement } from 'react'

import './Container.scss'

interface ContainerProps {
  children?: null | ReactElement | string | (null | ReactElement | string)[]
}

const Container = ({
  children
}: ContainerProps) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

export { Container }
