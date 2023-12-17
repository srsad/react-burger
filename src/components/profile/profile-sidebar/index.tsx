import {type FC } from "react"
import { useLocation } from "react-router-dom"

import { ProfileSidebarItem } from "./profile-sidebar-item"
import { logout } from "../../../services/actions/auth"

import { APP_PATH } from "../../../shared/common"
import cls from "./style.module.css"

import { useAppDispatch } from '../../../hooks/useStore'

export const ProfileSidebar: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const navItems: { title: string, path: string }[] = [{
    title: 'Профиль',
    path: APP_PATH.PROFILE
  }, {
    title: 'История заказов',
    path: APP_PATH.ORDERS
  }]
  
  function getDesctirption(): string {
    if (location.pathname === APP_PATH.ORDERS) {
      return 'В этом разделе вы можете просмотреть свою историю заказов'
    }

    return 'В этом разделе вы можете изменить свои персональные данные'
  }
  
  async function logountHandler() {
    await dispatch(logout())
  }

  return (
    <nav className={cls.navigation}>
      <ul className={`${cls.list}`}>
        {navItems.map((el, index) => (
          <li key={index}>
            <ProfileSidebarItem
              text={el.title}
              path={el.path}
            />
          </li>
        ))}
        <li>
          <p
            className={`${cls.logout} text text_color_inactive text_type_main-medium`}
            onClick={logountHandler}
          >
            Выход
          </p>
        </li>
      </ul>

      <p className={`${cls.text} text text_type_main-default text_color_inactive`}>
        {getDesctirption()}
      </p>
    </nav>
  )
}
