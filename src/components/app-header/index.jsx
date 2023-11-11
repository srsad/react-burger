import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { Link  } from 'react-router-dom'

import { MenuItem } from "./manu-item"
import { APP_PATH } from "../../shared/common"

import cls from "./style.module.css"

export const AppHeader = () => {
  return (
    <header
      className={`${cls.appHeader} text text_type_main-default pt-4 pb-4`}
    >
      <section className={cls.wrapper}>
        <nav>
          <ul className={cls.navinationList}>
            <li>
              <MenuItem
                text="Конструктор"
                Icon={BurgerIcon}
                path={APP_PATH.MAIN}
              />
            </li>
            <li>
              <MenuItem
                text="Лента заказозв"
                Icon={ListIcon}
                path={APP_PATH.ORDERS}
              />
            </li>
          </ul>
        </nav>

        <Link to={APP_PATH.MAIN}>
          <Logo className={cls.navinationLogo} />
        </Link>

        <section className={cls.navinationProfile}>
          <MenuItem
            text="Личный кабинет"
            Icon={ProfileIcon}
            path={APP_PATH.PROFILE}
          />
        </section>
      </section>
    </header>
  )
}
