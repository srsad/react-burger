import type { FC } from "react"
import { NavLink } from "react-router-dom"

import cls from "./style.module.css"

import { } from "../../../../types/common"

type TProps = {
  text: string,
  path: string,
}

export const ProfileSidebarItem: FC<TProps> = ({ text, path }) => {
  function getClasses(isActive: boolean): string {
    let classList = cls.link + ' text text_color_inactive text_type_main-medium '

    if (isActive) {
      classList += cls.active
    }

    return classList
  }

  return (
    <NavLink
      className={({ isActive }) => getClasses(isActive)}
      to={path}
    >
      {text}
    </NavLink>
  )
}
