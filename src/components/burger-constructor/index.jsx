import PropTypes from 'prop-types'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { BurgerConstructorList } from './burger-constructor-list'
import { BurgerConstructorAmount } from './burger-constructor-amount'

import componentClasses from './style.module.css'

import { ingredientShape } from '../../types/common'

export const BurgerConstructor = ({ ingredientsList }) => {
  return (
    <div className={componentClasses.burgerConstructor}>
      
      <BurgerConstructorList ingredientsList={ingredientsList} />

      <section className={componentClasses.order}>
        <BurgerConstructorAmount totalAmount={610} />

        <Button
          size="large"
          type="primary"
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  )
}

BurgerConstructorList.defaultProps = {
  ingredientsList: []
}

BurgerConstructor.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientShape).isRequired
}