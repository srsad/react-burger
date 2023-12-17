import type { PayloadAction } from '@reduxjs/toolkit'

import { $api } from '../../api'

import { errorSlice } from "../reducers/errorSlice"
import { authSlice } from "../reducers/authSlice"

import type { TAppDispatch } from '../store'
import type {
  TLoginReques,
  TErrorResponse,
  TUserDataBase,
  TPasswordResetReques,
  TResetPasswordReques,
  TUserDatanReques,
  TBaseRefreshToken,
} from "../../types/api"
import type { TInitialStateAuth } from "../initialState"

// авторизация
export const login = (params: TLoginReques): Function => async (dispatch: TAppDispatch) => {
  try {
    const response = await $api.auth.login(params)
    dispatch(authSlice.actions.setAuthData(response.user))
    dispatch(authSlice.actions.setToken(response))
  } catch (error: unknown) {
    const errorMessage = (error as TErrorResponse)?.message ?? "Не уалось авторизоваться"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)
  }
}

export const logout = (): Function => async (dispatch: TAppDispatch) => {
  try {
    await $api.auth.logout()
    dispatch(authSlice.actions.setAuthData({
      name: '',
      email: '',
    }))
    dispatch(authSlice.actions.removeToken())
  } catch (error) {
    const errorMessage = (error as TErrorResponse)?.message ?? "Не уалось выйти"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)    
  }
}

export const passwordReset = (params: TPasswordResetReques): Function => async (dispatch: TAppDispatch) => {
  try {
    await $api.auth.passwordReset(params)
  } catch (error) {
    const errorMessage = (error as TErrorResponse)?.message ?? "Не уалось восстановить пароль"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)    
  }
}

export const resetPassword = (params: TResetPasswordReques): Function => async (dispatch: TAppDispatch) => {
  try {
    await $api.auth.resetPassword(params)
  } catch (error) {
    const errorMessage = (error as TErrorResponse)?.message ?? "Не уалось обновить пароль"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)    
  }
}

// регистрация
export const register = (params: TUserDataBase) => async (dispatch: TAppDispatch) => {
  try {
    const response = await $api.auth.register(params)
    dispatch(authSlice.actions.setAuthData(response.user))
    dispatch(authSlice.actions.setToken(response))
  } catch (error) {
    const errorMessage = (error as TErrorResponse)?.message ?? "Не уалось зарегистрироваться"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)
  }
}

export const getUserData = (): Function => async (dispatch: TAppDispatch) => {
  if (!localStorage.getItem('accessToken')) {
    return
  }

  try {
    const response = await $api.auth.getUserData()
    dispatch(authSlice.actions.setAuthData(response.user))
  } catch (error) {
    console.error("Не уалось получить данные пользователя", error)
  }
} 

export const setUserData = (params: TUserDatanReques): Function => async (dispatch: TAppDispatch) => {
  try {
    const response = await $api.auth.updateUserData(params)
    dispatch(authSlice.actions.setAuthData(response.user))
  } catch (error) {
    console.error("Не уалось получить данные пользователя", error)
  }
} 

// установка данных в стейст
export const setAuthData = (state: TInitialStateAuth, action: PayloadAction<TInitialStateAuth>) => {
  state.name = action.payload.name
  state.email = action.payload.email
}

// установка/обновление токена
export const setToken = (_state: TInitialStateAuth, action: PayloadAction<TBaseRefreshToken>) => {
  localStorage.setItem('accessToken', action.payload.accessToken)
  localStorage.setItem('refreshToken', action.payload.refreshToken)
}

// удаление токена
export const removeToken = (): void => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
