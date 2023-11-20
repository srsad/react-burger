import { createSlice } from "@reduxjs/toolkit"

import { initialStateIngredients as initialState } from '../initialState'
import * as actions from '../actions/ingredients'

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: { ...actions },
})

export default ingredientsSlice.reducer
export const {
  setIngredientDetatl,
  cleanIngredientDetatl,

  setIngredientItem,
  moveIngredientItem,
  removeIngredientItem,
  cleanIngredientItems,
  cleanIngredientBun,

  setIngredientBun,
  removeIngredientBun,
  setIngredientsList,
} = ingredientsSlice.actions
