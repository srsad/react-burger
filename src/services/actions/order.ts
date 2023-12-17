import type { PayloadAction } from '@reduxjs/toolkit'

import { $api } from '../../api'

import { orderSlice } from "../reducers/orderSlice"
import { ingredientsSlice } from "../reducers/ingredientsSlice"
import { errorSlice } from "../reducers/errorSlice"

import type { TAppDispatch } from '../store'
import type { TDetailOrderResponse } from "../../types/api"
import type { TInitialStateOrder } from "../initialState"

// создание заказа
export const createOrder = (ingredientsIds: string[]): Function => async (dispatch: TAppDispatch) => {
  try {
    const { name, order } = await $api.orders.createOrder(ingredientsIds)
    dispatch(orderSlice.actions.setOrder({ name, order }))
    dispatch(ingredientsSlice.actions.cleanIngredientItems())
    dispatch(ingredientsSlice.actions.cleanIngredientBun())
  } catch (error) {
    const errorMessage = "Не удалось создать заказ"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)
  }
}

export const getDetailOrder = (orderNumber: string): Function => async (dispatch: TAppDispatch) => {
  try {
    const response = await $api.orders.getOrderByNumber(orderNumber)
    dispatch(orderSlice.actions.setDetailOrder(response))
  } catch (error) {
    const errorMessage = "Не удалось получить данные заказа"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)
  }
}

// деталка заказа
export const setDetailOrder = (state: TInitialStateOrder, action: PayloadAction<TDetailOrderResponse>) => {
  state.detailOrder = action.payload.orders[0]
}

export const cleanDetailOrder = (state: TInitialStateOrder) => {
  state.detailOrder = null
}

// объект созданного заказа
export const setOrder = (state: TInitialStateOrder, action: PayloadAction<Omit<TInitialStateOrder, 'detailOrder'>>) => {
  state.name = action.payload.name
  state.order = action.payload.order
}

export const cleanOrder = (state: TInitialStateOrder) => {
  state.name = ''
  state.order.number = null
}
