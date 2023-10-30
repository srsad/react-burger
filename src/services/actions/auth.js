import { $api } from '../../api'

import { errorSlice } from "../reducers/errorSlice"
import { authSlice } from "../reducers/authSlice"

// авторизация
export const login = (params) => async (dispatch) => {
  try {
    const response = await $api.auth.login(params)
    dispatch(authSlice.actions.setAuthData(response.user))
    dispatch(authSlice.actions.setToken(response))
  } catch (error) {
    const errorMessage = error?.message ?? "Не уалось авторизоваться"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await $api.auth.logout()
    dispatch(authSlice.actions.setAuthData({
      name: '',
      email: '',
    }))
    dispatch(authSlice.actions.removeToken())
  } catch (error) {
    const errorMessage = error?.message ?? "Не уалось выйти"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)    
  }
}

export const passwordReset = (params) => async (dispatch) => {
  try {
    await $api.auth.passwordReset(params)
  } catch (error) {
    const errorMessage = error?.message ?? "Не уалось восстановить пароль"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)    
  }
}

export const resetPassword = (params) => async (dispatch) => {
  try {
    await $api.auth.resetPassword(params)
  } catch (error) {
    const errorMessage = error?.message ?? "Не уалось обновить пароль"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)    
  }
}

// регистрация
export const register = (params) => async (dispatch) => {
  try {
    const response = await $api.auth.register(params)
    dispatch(authSlice.actions.setAuthData(response.user))
    dispatch(authSlice.actions.setToken(response))
  } catch (error) {
    const errorMessage = "Не уалось зарегистрироваться"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)
  }
}

export const getUserData = () => async (dispatch) => {
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

export const setUserData = (params) => async (dispatch) => {
  try {
    const response = await $api.auth.updateUserData(params)
    dispatch(authSlice.actions.setAuthData(response.user))
  } catch (error) {
    console.error("Не уалось получить данные пользователя", error)
  }
} 

// установка данных в стейст
export const setAuthData = (state, action) => {
  state.name = action.payload.name
  state.email = action.payload.email
}

// установка/обновление токена
export const setToken = (_, action) => {
  localStorage.setItem('accessToken', action.payload.accessToken)
  localStorage.setItem('refreshToken', action.payload.refreshToken)
}

// удаление токена
export const removeToken = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
