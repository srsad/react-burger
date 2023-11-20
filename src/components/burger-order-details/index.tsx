import { type FC } from "react"
import { useSelector } from "react-redux"

import cls from "./style.module.css"

export const OrderDetails: FC = () => {
  const orderNumber = useSelector((state: any) => state.order.order.number)

  return (
    <div className={cls.order}>
      <p className={`${cls.orderNumber} text text_type_digits-large text-center`}>
        {orderNumber}
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
