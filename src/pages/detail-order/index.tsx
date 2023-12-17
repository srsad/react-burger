import { type FC,  useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

import { ORDER_STATUS_LOCALE } from '../../shared/common'

import cls from "./style.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/useStore"

import { cleanDetailOrder } from "../../services/reducers/orderSlice"
import { getDetailOrder } from "../../services/actions/order"
import { TIngredient } from "../../types/common"


type TProps = {
  fullPage?: boolean
}

type TParams = {
  id: string
}

type TIngredientAggregate = TIngredient & {
  count: number
}

export const DetailOrder: FC<TProps> = ({ fullPage = true }) => {
  const { id: orderNumber } = useParams<TParams>()

  const dispatch = useAppDispatch()
  const detailOrder = useAppSelector((state) => state.order.detailOrder)
  const ingredientsList = useAppSelector((state) => state.ingredients.ingredientsList)

  const status = useMemo<string>(() => {
    if (!detailOrder) {
      return ''
    }

    return ORDER_STATUS_LOCALE[detailOrder.status]
  }, [detailOrder])

  const ingredientsFiltredList = useMemo<TIngredient[]>(() => {
    if (!detailOrder) {
      return []
    }

    return ingredientsList.filter(el => detailOrder.ingredients.includes(el._id))
  }, [ingredientsList, detailOrder])

  const ingredientsViewList = useMemo<TIngredientAggregate[]>(() => {
    if (!detailOrder) {
      return []
    }

    return ingredientsFiltredList.map((el) => {
      const res: TIngredientAggregate = {
        ...el,
        count: detailOrder.ingredients.filter(itemId => itemId === el._id).length
      }
      return res
    }) as TIngredientAggregate[]
  }, [detailOrder, ingredientsFiltredList])

  const price = useMemo<number>(() => {
    return ingredientsFiltredList.reduce((acc, next) => acc + next.price, 0)
  }, [ingredientsFiltredList])

  useEffect(() => {
    dispatch(getDetailOrder(orderNumber as string))

    return () => {
      dispatch(cleanDetailOrder())
    }
  }, [])

  if (!detailOrder) {
    return (
    <div className={cls.order}>
      {/*  */}
    </div>
    )
  }

  return (
    <div className={fullPage ? cls.wrapper : cls.order}>
      <p className={`${cls.orderTitle} text text_type_digits-default mb-10`}>#{orderNumber}</p>
      <h1 className="text text_type_main-medium">{detailOrder.name}</h1>
      <p className={`text text_type_main-default mb-15 ${cls['orderStatus_' + detailOrder.status]}`}>{status}</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>

      <ul className={`custom-scroll ${cls.ingredientsList}`}>
        {ingredientsViewList.map((el) => (
          <li key={el._id} className={cls.ingredientItem}>
            <div className={cls.ingredientImage}>
              <img src={el.image} alt={el.name} />
            </div>
            <p className={`text text_type_main-default ${cls.ingredientName}`}>
              {el.name}
            </p>
            <p className={`text text_type_digits-default ${cls.total}`}>
              {`${el.count} x ${el.price}`}
              <CurrencyIcon type="primary" />
            </p>
          </li>
        ))}
      </ul>

      <div className={cls.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(detailOrder.createdAt)} /> i-GMT+3
        </p>
        <div className={cls.total}>
          <p className="text text_type_digits-default">{`${price}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

