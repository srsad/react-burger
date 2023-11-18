import { useState, useMemo } from "react"
import type { FC, ComponentType } from "react"
import { NavLink  } from 'react-router-dom'
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils"

import menuItemStyles from "./style.module.css"

type TProps = {
  text?: string,
  Icon: ComponentType<TIconProps>,
  customClassName?: string,
  path?: string,
}

export const MenuItem: FC<TProps> = ({
  text = "",
  Icon,
  customClassName = "",
  path = "/",
}) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const iconType = useMemo<"primary" | "secondary">(() => {
    return isActive ? "primary" : "secondary"
  }, [isActive])

  const activeClass = useMemo<string>(() => {
    return isActive ? menuItemStyles.menuItem_active : ""
  }, [isActive])

  function checkActive(isActive: boolean): string {
    setIsActive(isActive)
    return `${menuItemStyles.menuItem} ${customClassName} ${activeClass}`
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) => checkActive(isActive)}
    >
      <>
        <Icon type={iconType} />
        <span className="ml-2">{text}</span>
      </>
    </NavLink>
  )
}
