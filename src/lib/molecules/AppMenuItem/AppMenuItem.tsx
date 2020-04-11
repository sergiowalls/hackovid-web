import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { IconName } from '@blueprintjs/icons'

import { AppMenuButton } from '../AppMenuButton/AppMenuButton'

import './AppMenuItem.scss'

interface AppMenuItemProps {
  icon: IconName
  path: string
  children: string
}

const AppMenuItem = ({
  icon,
  path,
  children
}: AppMenuItemProps) => {
  const history = useHistory()
  const location = useLocation()

  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(location.pathname === path)
  }, [location.pathname, path])

  return (
    <AppMenuButton
      onClick={() => history.push(path)}
      className={`app-menu-item__button ${active ? 'active' : ''}`}
      icon={icon}
    >
      {children}
    </AppMenuButton>
  )
}

export { AppMenuItem }
