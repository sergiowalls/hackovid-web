import React from 'react'
import { Icon, IconName } from '@blueprintjs/core'

import './AppMenuButton.scss'

interface AppMenuButtonProps {
  children: string
  icon?: IconName
  onClick?: () => void
  className?: string
}

const AppMenuButton = ({
  children,
  icon,
  onClick,
  className
}: AppMenuButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`app-menu-button ${className}`}
    >
      <Icon icon={icon} />
      <span>{children}</span>
    </div>
  )
}

export { AppMenuButton }
