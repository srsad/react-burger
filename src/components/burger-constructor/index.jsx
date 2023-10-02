import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { OrderDetails } from '../burger-order-details'
import { Modal } from '../ui/modal'
import { BurgerConstructorAmount } from './burger-constructor-amount'
import { BurgerConstructorList } from './burger-constructor-list'

import cls from './style.module.css'

import { ingredientShape } from '../../types/common'

export const BurgerConstructor = ({ ingredientsList }) => {
  /**
   * Детальное окно заказа
  */
  const [showModal, setShowModal] = useState(false)
  // TODO: когда будет понятна сущьность заказа - вынести в шейп и прокидывать в OrderDetails
  const [orderParams, setOrderParams] = useState({orderNumber: '034536'})

  return (
    <div className={cls.burgerConstructor}>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails orderNumber={orderParams.orderNumber} />
        </Modal>
      )}
      
      <BurgerConstructorList ingredientsList={ingredientsList} />

      <section className={cls.order}>
        <BurgerConstructorAmount totalAmount={610} />

        <Button
          size="large"
          type="primary"
          htmlType="button"
          onClick={() => setShowModal(true)}
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
