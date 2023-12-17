import { FC, useMemo } from "react"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useLocation } from "react-router-dom"

import type { TOrder } from "../../types/api"
import { useAppSelector } from "../../hooks/useStore"

import cls from "./style.module.css"
import type { TIngredient } from "../../types/common"
import { ORDER_STATUS_LOCALE } from "../../shared/common"

type TProps = {
  order: TOrder
  path: string
  showStatus?: boolean
}

export const OrderItem: FC<TProps> = ({ order, path, showStatus = false }) => {
  const location = useLocation()

  const ingredientsList = useAppSelector((state) => state.ingredients.ingredientsList)

  const ingredientsOrder = useMemo(() => {
    return ingredientsList?.filter((ingredient) =>
      order.ingredients?.includes(ingredient._id)
    )
  }, [ingredientsList, order])
  
  const MAX_VISIBLE_ITEMS = 6

  // список ингредиентов для вывода
  const ingredientsOrderThumb = useMemo(() => {
    const result = {
      visibleItems: [...ingredientsOrder],
      residue: 0
    }

    const ingredientsOrderLength = ingredientsOrder.length

    if (ingredientsOrderLength > MAX_VISIBLE_ITEMS) {
      result.visibleItems = result.visibleItems.splice(0, MAX_VISIBLE_ITEMS)
      result.residue = ingredientsOrderLength -1 - MAX_VISIBLE_ITEMS
    }

    return result
  }, [ingredientsOrder])

  const totalPrice = useMemo(() => {
    return ingredientsOrder.reduce((accumulator: number, current: TIngredient) => {
      return accumulator + current.price
    }, 0)
  }, [ingredientsOrder])

  const toPath = path.replace(':id', order.number.toString())

  return (
    <Link
      className={cls.order}
      to={toPath}
      state={{ backgroundLocation: location }}
    >
      <div className={cls.orderHeader}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} /> i-GMT+3
        </p>
      </div>
      <h3 className="text text_type_main-medium">
        {order.name}
        {showStatus && (
          <p className={`${cls['orderStatus_' + order.status]} text text_type_main-default`}>{ORDER_STATUS_LOCALE[order.status]}</p>
        )}
      </h3>
      <div className={cls.orderIngridients}>
        <ul className={cls.orderThumb}>
          {ingredientsOrderThumb.visibleItems.map((item, index) => (
            <li
              className={`${cls.orderThumbItem} ${(index === 0 && ingredientsOrderThumb.residue > 0) ? cls.orderThumbItem_active : ''}`}
              key={item._id}
            >
              <img
                src={item.image_mobile}
                alt={item.name}
              />

              {(index === 0 && ingredientsOrderThumb.residue > 0) && (
                <span className={`${cls.orderThumbResidue} text text_type_main-default`}>
                  +{ingredientsOrderThumb.residue}
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className={`${cls.orderPrice} text text_type_digits-default`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  )
}
