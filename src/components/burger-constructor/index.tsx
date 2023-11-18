import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useMemo, FC } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, type NavigateFunction } from "react-router-dom"

import { OrderDetails } from "../burger-order-details"
import { Modal } from "../ui/modal"
import { BurgerConstructorAmount } from "./burger-constructor-amount"
import { BurgerConstructorList } from "./burger-constructor-list"

import { createOrder } from "../../services/actions/order"

import { TIngredient } from "../../types/common"

import { APP_PATH } from "../../shared/common"
import cls from "./style.module.css"

export const BurgerConstructor: FC = () => {
  const navigate: NavigateFunction = useNavigate()

  const errorMessage = useSelector((state: any) => state.errorMessage)
  const selectIngredients = useSelector((store: any) => store.ingredients.burgerConstructor.items)
  const selectBun = useSelector((store: any) => store.ingredients.burgerConstructor.bun)
  const hasAuth = useSelector((store: any) => store.auth.name && store.auth.email)

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
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const totalAmount = useMemo<number>(() => {
    return ingredientsList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    )
  }, [ingredientsList])

  const ingredientsIds = useMemo<string[]>(() => {
    return ingredientsList.map((el: TIngredient) => el._id)
  }, [ingredientsList])

  /**
   * Оформление заказа
   */
  async function orderHandler() {
    if (!hasAuth) {
      navigate(APP_PATH.LOGIN)
    }

    setLoading(true)
    // @ts-ignore
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