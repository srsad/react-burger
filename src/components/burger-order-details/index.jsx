import { useContext } from "react"

import { OrderContext } from "../../services/orderContext"

import cls from "./style.module.css"

export const OrderDetails = () => {
  const [orderParams] = useContext(OrderContext)

  return (
    <div className={cls.order}>
      <p
        className={`${cls.orderNumber} text text_type_digits-large text-center`}
      >
        {orderParams.order.number}
      </p>

      <p className={`${cls.orderNumberDescription} text text_type_main-medium`}>
        идентификатор заказа
      </p>

      <div className={cls.image}>
        <img src="/images/done.png" alt="Ваш заказ начали готовить" />
      </div>

      <p className="text text_type_main-default text-center mb-2">
        Ваш заказ начали готовить
      </p>

      <p className="text text_type_main-default text-center">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
