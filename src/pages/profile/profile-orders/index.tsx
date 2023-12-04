import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore"
import { APP_PATH, WS_PATH } from "../../../shared/common"
import { connect, disconnect } from "../../../services/actions/wsOrders"

import cls from "./style.module.css"
import { OrderItem } from "../../../components/order-item"

export const ProfileOrders = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.wsOrdersFeed.orders)

  const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '')

  useEffect(() => {
    dispatch(connect(`${WS_PATH.PROFILE_ORDERS_ALL}?token=${accessToken}`))
    return () => {
      dispatch(disconnect())
    }
  }, [])

  return (
    <section className={cls.container}>
      <ul className={`${cls.ordersList} custom-scroll`}>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} path={APP_PATH.ORDER} showStatus />
        ))}
      </ul>
    </section>
  )
}
