import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useContext, useMemo, useState } from 'react'

import { OrderDetails } from '../burger-order-details'
import { Modal } from '../ui/modal'
import { BurgerConstructorAmount } from './burger-constructor-amount'
import { BurgerConstructorList } from './burger-constructor-list'

import cls from './style.module.css'

import { ErrorContext } from '../../services/errorContext'
import { OrderContext } from '../../services/orderContext'

import { $api } from '../../api'
import { checkReponse } from '../../utils/common'

import { ingredientShape } from '../../types/common'

export const BurgerConstructor = ({ ingredientsList = [] }) => {
  const [_orderParams, setOrderParams] = useContext(OrderContext)
  const [_errorNotification, setErrorNotification] = useContext(ErrorContext)

  /**
   * Детальное окно заказа
   */
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const totalAmount = useMemo(() => {
    return ingredientsList.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
  }, [ingredientsList]);

  const ingredientsIds = useMemo(() => {
    return ingredientsList.map((el) => el._id);
  }, [ingredientsList]);

  async function orderHandler() {
    setLoading(true)

    try {
      const response = await $api.orders.createOrder(ingredientsIds)
      const result = await checkReponse(response)
      setOrderParams(result)
      setShowModal(true)
    } catch (error) {
      const errorMessage = 'Не удалось создать заказ!'
      console.error(errorMessage, error)
      setErrorNotification(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cls.burgerConstructor}>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails />
        </Modal>
      )}
      
      <BurgerConstructorList ingredientsList={ingredientsList} />

      <section className={cls.order}>
        <BurgerConstructorAmount totalAmount={totalAmount} />

        <Button
          size="large"
          type="primary"
          htmlType="button"
          disabled={loading}
          onClick={orderHandler}
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  )
}

BurgerConstructor.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientShape).isRequired
}
