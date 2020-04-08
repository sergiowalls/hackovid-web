import React from 'react'

import './Container.scss'

interface ContainerProps {
  children?: any
  className?: string
}

const Container = ({
  children,
  className
}: ContainerProps) => {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  )
}

export { Container }
