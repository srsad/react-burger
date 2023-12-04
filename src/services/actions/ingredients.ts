import type { PayloadAction } from '@reduxjs/toolkit'
import type { UUID } from "crypto"

import { $api } from '../../api'

import { ingredientsSlice } from "../reducers/ingredientsSlice"
import { errorSlice } from "../reducers/errorSlice"

import type { TAppDispatch } from '../store'
import type { TInitialStateIngredients } from "../initialState"
import type { TIngredient, TIngredientAgregate } from "../../types/common"

/**
 * Загрузка ингридиентов
 * Намерянно не использовал createAsyncThunk так как не срабатывал диспатч в errorSlice
 */
export const fetchIngredientsList = (): Function => async (dispatch: TAppDispatch) => {
  dispatch(ingredientsSlice.actions.setLoading(true))

  try {
    const { data } = await $api.ingredients.getIngredients()
    dispatch(ingredientsSlice.actions.setIngredientsList(data))
  } catch (error) {
    const errorMessage = "Не уалось получить список ингридиентов"
    dispatch(errorSlice.actions.setError(errorMessage))
    console.error(errorMessage, error)
  } finally {
    dispatch(ingredientsSlice.actions.setLoading(false))
  }
}

// статус загрузки
export const setLoading = (state: TInitialStateIngredients, action: PayloadAction<boolean>) => {
  state.loading = action.payload
}

// записываем список всех полученных ингредиентов
export const setIngredientsList = (state: TInitialStateIngredients, action: PayloadAction<TIngredient[]>) => {
  state.ingredientsList = action.payload
}

// записываем список всех ингредиентов в текущем конструкторе бургера
export const setIngredientBun = (state: TInitialStateIngredients, action: PayloadAction<TIngredientAgregate>) => {
  state.burgerConstructor.bun = action.payload
}

export const setIngredientItem = (state: TInitialStateIngredients, action: PayloadAction<TIngredientAgregate>) => {
  state.burgerConstructor.items.push({
    ...action.payload,
    uuid: crypto.randomUUID() as UUID
  })
}

export const moveIngredientItem = (state: TInitialStateIngredients, action: PayloadAction<{ oldIndex: number, newIndex: number }>) => {
  const result = [...state.burgerConstructor.items]
  const activIngredient = state.burgerConstructor.items[action.payload.oldIndex]
  result.splice(action.payload.oldIndex, 1)
  result.splice(action.payload.newIndex, 0, activIngredient)

  state.burgerConstructor.items = result
}

export const removeIngredientItem = (state: TInitialStateIngredients, action: PayloadAction<UUID>) => {
  state.burgerConstructor.items = state.burgerConstructor.items.filter(el => el.uuid !== action.payload)
}

export const cleanIngredientBun = (state: TInitialStateIngredients) => {
  state.burgerConstructor.bun = null
}

export const cleanIngredientItems = (state: TInitialStateIngredients) => {
  state.burgerConstructor.items = []
}

// объект текущего просматриваемого ингредиента
export const setIngredientDetatl = (state: TInitialStateIngredients, action: PayloadAction<TIngredient | null>) => {
  state.ingredientDetatl = action.payload
}

export const cleanIngredientDetatl = (state: TInitialStateIngredients) => {
  state.ingredientDetatl = null
}
