import apiController from '../api/apiController'
import type { TIngredient } from './common'
import { ORDER_STATUS } from '../shared/common'

export type TErrorResponse = {
  message?: string
}

export type TServerResponse<T> = {
  success: boolean
} & T

export type TBaseRefreshToken = {
  refreshToken: string
  accessToken: string
}

export type TRefreshToken = TServerResponse<TBaseRefreshToken>

export type TFetchInstance = ReturnType<typeof apiController>

export type TUserDataBase = {
  email: string
  name: string
  password: string
}

// ingredients
export type TIngredientResponse = TServerResponse<{
  data: TIngredient[]
}>

// order
export type TOrderResponse = TServerResponse<{
  name: string
  order: {
    number: number
  }
}>

export type TOrderTypes = Lowercase<keyof typeof ORDER_STATUS>

export type TOrder = {
  _id: string
  ingredients: string[]
  status: TOrderTypes
  name: string
  createdAt: string
  updatedAt: string
  number: number
}

export type TDetailOrderResponse = TServerResponse<{
  orders: TOrder[]
}>

export type TWSOrdersResponse = TServerResponse<{
  orders: TOrder[]
  total: number
  totalToday: number
}>

// auth
export type TLoginReques = Omit<TUserDataBase, 'name'>

export type TLogoutResponse = TServerResponse<{
  message: string
}>

/**
 * Базовые данные пользователя
 */
export type TUserData = {
  user: Omit<TUserDataBase, 'password'>
}

export type TUserDataWithTokenResponse = TRefreshToken & TUserData

export type TPasswordResetReques = {
  password: string
  token: string
}

export type TPasswordResetResponse = TServerResponse<{
  message: string
}>

export type TResetPasswordReques = {
  email: string
}

export type TResetPasswordResponse = TServerResponse<{
  message: string
}>

export type TUserDatanResponse = TServerResponse<TUserData>

export type TUserDatanReques = {
  email: string
  name: string
  password?: string
}
