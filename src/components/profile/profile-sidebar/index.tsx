import type { FC } from "react"
import {useDispatch } from "react-redux"

import { ProfileSidebarItem } from "./profile-sidebar-item"
import { logout } from "../../../services/actions/auth"

import { APP_PATH } from "../../../shared/common"
import cls from "./style.module.css"

export const ProfileSidebar: FC = () => {
  const dispatch = useDispatch()

  const navItems: { title: string, path: string }[] = [{
    title: 'Профиль',
    path: APP_PATH.PROFILE
  }, {
    title: 'История заказов',
    path: APP_PATH.ORDERS
  }]

  async function logountHandler() {
    // @ts-ignore
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
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  )
}
