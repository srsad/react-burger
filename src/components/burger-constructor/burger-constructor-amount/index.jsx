import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import componentClasses from './style.module.css'

export const BurgerConstructorAmount = ({ totalAmount }) => {
  return (
    <p className={componentClasses.amount}>
      <span className="text text_type_digits-medium">
        {totalAmount}
      </span>
      <span className={componentClasses.icon}>
        <CurrencyIcon type="primary" />
      </span>
    </p>
  )
}

BurgerConstructorAmount.propTypes = {
  totalAmount: PropTypes.number.isRequired
}
