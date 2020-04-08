import React from 'react'

import './SafePageView.scss'

interface SafePageViewProps {
  children?: any
  className?: string
}

const SafePageView = ({
  children,
  className
}: SafePageViewProps) => {
  return (
    <div className={`safe-page-view ${className}`}>
      {children}
    </div>
  )
}

export { SafePageView }
