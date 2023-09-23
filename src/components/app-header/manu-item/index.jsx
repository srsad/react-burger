import PropTypes from 'prop-types'
import { useMemo } from 'react'

import menuItemStyles from './style.module.css'

export const MenuItem = ({text, Icon, isActive, customClassName, onClick}) => {
  const iconType = useMemo(() => {
    return isActive ? 'primary' : 'secondary'
  }, [isActive]) 

  const activeClass = useMemo(() => {
    return isActive ? menuItemStyles.menuItem_active : ''
  }, [isActive]) 

  return (
    <a href="/" className={`${menuItemStyles.menuItem} ${customClassName} ${activeClass}`}>
      <Icon type={iconType} />
      <span className="ml-2">{text}</span>
    </a>
  )
}

MenuItem.defaultProps = {
  text: '',
  isActive: false,
  customClassName: '',
  onClick: () => {}
}

MenuItem.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  customClassName: PropTypes.string,
  onClick: PropTypes.func
}
