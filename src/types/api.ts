import apiController from '../api/apiController'
import { TIngredient } from './common'

export type TErrorResponse = {
  message: string
}

export type TServerResponse<T> = {
  success: boolean
} & T

export type TRefreshToken = TServerResponse<{
  refreshToken: string,
  accessToken: string,
}>

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
export type TOrderReques = {
  ingredients: string[]
}

// TODO: добить
export type TOrderResponse = TServerResponse<{
  data: TIngredient[]
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
  password: string,
  token: string,
}

export type TPasswordResetResponse = TServerResponse<{
  message: string
}>

export type TResetPasswordReques = {
  email: string,
}

export type TResetPasswordResponse = TServerResponse<{
  message: string
}>

export type TUserDatanResponse = TServerResponse<TUserData>

export type TUserDatanReques = {
  email: string,
  name: string,
  password?: string,
}
