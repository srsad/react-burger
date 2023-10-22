import { $api } from '../../api'
import { checkReponse } from "../../utils/common"

import { orderSlice } from "../reducers/orderSlice"
import { errorSlice } from "../reducers/errorSlice"

// создание заказа
export const createOrder = (ingredientsIds) => async (dispatch) => {
  try {
    const response = await $api.orders.createOrder(ingredientsIds)
    const result = await checkReponse(response)
    dispatch(orderSlice.actions.setOrder(result))
  } catch (error) {
    const errorMessage = "Не удалось создать заказ"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)
  }
}

// объект созданного заказа
export const setOrder = (state, action) => {
  state.name = action.payload.name
  state.order = action.payload.order
  state.success = action.payload.success
}

export const cleanOrder = (state) => {
  state.name = ''
  state.order = { number: '' }
  state.success = true
}
