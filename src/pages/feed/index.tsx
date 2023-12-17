import { useEffect, useMemo } from "react"

import cls from "./style.module.css"
import { OrderItem } from "../../components/order-item"
import { useAppDispatch, useAppSelector } from "../../hooks/useStore"
import { connect, disconnect } from "../../services/actions/wsOrders"
import { WS_PATH, ORDER_STATUS, APP_PATH } from "../../shared/common"


export const Feed = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.wsOrdersFeed.orders)
  const total = useAppSelector((state) => state.wsOrdersFeed.total)
  const totalToday = useAppSelector((state) => state.wsOrdersFeed.totalToday)

  // решил так замокать
  const doneOrderNumbers = useMemo<number[]>(() => {
    return orders
    .filter(el => el.status === ORDER_STATUS.DONE)
    .map(el => el.number)
  }, [orders])
  
  // решил так замокать
  const pendingOrderIds = useMemo<number[]>(() => {
    return orders
      .filter(el => el.status === ORDER_STATUS.PENDING)
      .map(el => el.number)
  }, [orders])

  useEffect(() => {
    dispatch(connect(WS_PATH.ORDERS_ALL))
    return () => {
      dispatch(disconnect())
    }
  }, [])

  return (
    <section className={cls.feed}>
      <div className={cls.container}>
        <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
        <ul className={`${cls.ordersList} custom-scroll`}>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} path={APP_PATH.FEED_ID} />
          ))}
        </ul>
      </div>
      <div className={cls.container}>        
        <div className={cls.orders}>
          <div className={cls.orders_done}>
            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>

            <div className={`${cls.ordersStatusList} custom-scroll`}>
              {doneOrderNumbers.map(orderNumber => (
                <p className="text text_type_digits-default" key={orderNumber}>{orderNumber}</p>
              ))}
            </div>
          </div>
          <div className={cls.orders_process}>
            <h3 className="text text_type_main-medium mb-6">В работе:</h3>

            <div className={`${cls.ordersStatusList} custom-scroll`}>
              {pendingOrderIds.map(orderNumber => (
                <p className="text text_type_digits-default" key={orderNumber}>{orderNumber}</p>
              ))}
            </div>
          </div>
        </div>

        <div className={cls.ready}>
          <h4 className="text text_type_main-medium">Выполнено за все время:</h4>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className={cls.ready}>
          <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </section>
  )
}
