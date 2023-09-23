import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { MenuItem } from './manu-item'

import componentClasses from './style.module.css'

export const AppHeader = () => {
  return (
    <header className={`${componentClasses.appHeader} text text_type_main-default pt-4 pb-4`}>
      <section className={componentClasses.wrapper}>
        <nav>
          <ul className={componentClasses.navinationList}>
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
        
        <Logo className={componentClasses.navinationLogo} />

        <section className={componentClasses.navinationProfile}>
          <MenuItem
            text="Личный кабинет"
            Icon={ProfileIcon}
          />
        </section>
      </section>
    </header>
  )
}
