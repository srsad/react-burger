import { FC } from 'react'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import cls from "./style.module.css"

type TProps = {
  totalAmount: number
}

export const BurgerConstructorAmount: FC<TProps> = ({ totalAmount }) => {
  return (
    <p className={cls.amount}>
      <span className="text text_type_digits-medium">{totalAmount}</span>
      <span className={cls.icon}>
        <CurrencyIcon type="primary" />
      </span>
    </p>
  )
}
