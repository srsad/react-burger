import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useMemo } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { OrderDetails } from "../burger-order-details"
import { Modal } from "../ui/modal"
import { BurgerConstructorAmount } from "./burger-constructor-amount"
import { BurgerConstructorList } from "./burger-constructor-list"

import { createOrder } from "../../services/actions/order"

import cls from "./style.module.css"

export const BurgerConstructor = () => {
  const errorMessage = useSelector(state => state.errorMessage)
  const selectIngredients = useSelector((store) => store.ingredients.burgerConstructor.items)
  const selectBun = useSelector((store) => store.ingredients.burgerConstructor.bun)

  const ingredientsList = useMemo(() => {
    const result = [...selectIngredients]
    if (selectBun) {
      result.push(selectBun)
    }
    return result
  }, [selectBun, selectIngredients])

  const dispatch = useDispatch()

  /**
   * Детальное окно заказа
   */
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const totalAmount = useMemo(() => {
    return ingredientsList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    )
  }, [ingredientsList])

  const ingredientsIds = useMemo(() => {
    return ingredientsList.map((el) => el._id)
  }, [ingredientsList])

  async function orderHandler() {
    setLoading(true)
    await dispatch(createOrder(ingredientsIds))
    if (!errorMessage) {
      setShowModal(true)
    }
    setLoading(false)
  }

  return (
    <div className={cls.burgerConstructor}>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails />
        </Modal>
      )}

      <BurgerConstructorList />

      <section className={cls.order}>
        {!!totalAmount && (
          <>
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
          </>
        )}
      </section>
    </div>
  )
}
