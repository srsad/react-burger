import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"

import cls from "./style.module.css"

export const BurgerConstructorAmount = ({ totalAmount }) => {
  return (
    <p className={cls.amount}>
      <span className="text text_type_digits-medium">{totalAmount}</span>
      <span className={cls.icon}>
        <CurrencyIcon type="primary" />
      </span>
    </p>
  )
}

BurgerConstructorAmount.propTypes = {
  totalAmount: PropTypes.number.isRequired,
}
