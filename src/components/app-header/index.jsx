import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { MenuItem } from './manu-item'

import cls from './style.module.css'

export const AppHeader = () => {
  return (
    <header className={`${cls.appHeader} text text_type_main-default pt-4 pb-4`}>
      <section className={cls.wrapper}>
        <nav>
          <ul className={cls.navinationList}>
            <li>
              <MenuItem
                text="Конструктор"
                Icon={BurgerIcon}
                isActive
              />
            </li>
            <li>
              <MenuItem
                text="Лента заказозв"
                Icon={ListIcon}
              />
            </li>
          </ul>
        </nav>
        
        <Logo className={cls.navinationLogo} />

        <section className={cls.navinationProfile}>
          <MenuItem
            text="Личный кабинет"
            Icon={ProfileIcon}
          />
        </section>
      </section>
    </header>
  )
}
