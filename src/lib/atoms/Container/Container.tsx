import React from 'react'

import './Container.scss'

interface ContainerProps {
  children?: any
  className?: string
  fluid?: boolean
  leftMarginClass?: string
  rightMarginClass?: string
}

const Container = ({
  children,
  className,
  fluid,
  leftMarginClass,
  rightMarginClass
}: ContainerProps) => {
  return (
    <div className="container-wapper">
      <div className={`container__margin__left ${leftMarginClass}`} />
      <div className={`${fluid ? 'container-fluid' : 'container'} ${className}`}>
        {children}
      </div>
      <div className={`container__margin__right ${rightMarginClass}`}/>
    </div>
  )
}

export { Container }
