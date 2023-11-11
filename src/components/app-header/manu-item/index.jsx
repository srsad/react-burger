import PropTypes from "prop-types"
import { useState, useMemo } from "react"
import { NavLink  } from 'react-router-dom'

import menuItemStyles from "./style.module.css"

export const MenuItem = ({
  text = "",
  Icon,
  customClassName = "",
  path = "/",
}) => {
  const [isActive, setIsActive] = useState(false)

  const iconType = useMemo(() => {
    return isActive ? "primary" : "secondary"
  }, [isActive])

  const activeClass = useMemo(() => {
    return isActive ? menuItemStyles.menuItem_active : ""
  }, [isActive])

  return (
    <NavLink
      to={path}
      className={`${menuItemStyles.menuItem} ${customClassName} ${activeClass}`}
      style={({ isActive }) => setIsActive(isActive)}
    >
      <>
        <Icon type={iconType} />
        <span className="ml-2">{text}</span>
      </>
    </NavLink>
  )
}

MenuItem.propTypes = {
  text: PropTypes.string,
  customClassName: PropTypes.string,
  path: PropTypes.string,
}
