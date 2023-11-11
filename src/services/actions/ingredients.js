import { $api } from '../../api'

import { ingredientsSlice } from "../reducers/ingredientsSlice"
import { errorSlice } from "../reducers/errorSlice"

/**
 * Загрузка ингридиентов
 * Намерянно не использовал createAsyncThunk так как не срабатывал диспатч в errorSlice
 */
export const fetchIngredientsList = () => async (dispatch) => {
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
export const setLoading = (state, action) => {
  state.loading = action.payload
}

// записываем список всех полученных ингредиентов
export const setIngredientsList = (state, action) => {
  state.ingredientsList = action.payload
}

// записываем список всех ингредиентов в текущем конструкторе бургера
export const setIngredientBun = (state, action) => {
  state.burgerConstructor.bun = action.payload
}

export const setIngredientItem = (state, action) => {
  state.burgerConstructor.items.push({
    ...action.payload,
    uuid: crypto.randomUUID()
  })
}

export const moveIngredientItem = (state, action) => {
  const result = [...state.burgerConstructor.items]
  const activIngredient = state.burgerConstructor.items[action.payload.oldIndex]
  result.splice(action.payload.oldIndex, 1)
  result.splice(action.payload.newIndex, 0, activIngredient)

  state.burgerConstructor.items = result
}

export const removeIngredientItem = (state, action) => {
  state.burgerConstructor.items = state.burgerConstructor.items.filter(el => el.uuid !== action.payload)
}

export const cleanIngredientItems = (state) => {
  state.burgerConstructor.items = []
}

// объект текущего просматриваемого ингредиента
export const setIngredientDetatl = (state, action) => {
  state.ingredientDetatl = action.payload
}

export const cleanIngredientDetatl = (state) => {
  state.ingredientDetatl = null
}
