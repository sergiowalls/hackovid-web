import React, { useEffect, useState } from 'react'
import { Button } from '@blueprintjs/core'
import { useHistory, useLocation } from 'react-router-dom'
import { IconName } from '@blueprintjs/icons'

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
    <Button
      minimal={true}
      icon={icon}
      onClick={() => history.push(path)}
      active={active}
    >
      {children}
    </Button>
  )
}

export { AppMenuItem }
