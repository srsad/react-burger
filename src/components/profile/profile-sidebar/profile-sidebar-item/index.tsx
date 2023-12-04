import type { FC } from "react"
import { NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"

import cls from "./style.module.css"

type TProps = {
  text: string,
  path: string,
}

export const ProfileSidebarItem: FC<TProps> = ({ text, path }) => {
  const location = useLocation()

  function getClasses(): string {
    let classList = cls.link + ' text text_color_inactive text_type_main-medium '

    if (location.pathname === path) {
      classList += cls.active
    }

    return classList
  }

  return (
    <NavLink
      className={getClasses()}
      to={path}
    >
      {text}
    </NavLink>
  )
}
