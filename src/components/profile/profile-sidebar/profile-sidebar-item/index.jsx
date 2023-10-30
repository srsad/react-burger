import { NavLink } from "react-router-dom"

import cls from "./style.module.css"

export const ProfileSidebarItem = ({ text, path }) => {
  function getClasses(isActive) {
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
