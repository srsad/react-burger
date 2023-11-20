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
  return (
    <NavLink
      to={path}
      className={({isActive}) =>
        `${menuItemStyles.menuItem} ${customClassName} ` + (isActive ? menuItemStyles.menuItem_active : "")
      }
    >
      <>
        <Icon type="secondary" />
        <span className="ml-2">{text}</span>
      </>
    </NavLink>
  )
}
