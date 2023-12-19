import { createSlice } from "@reduxjs/toolkit"

import { initialStateIngredients as initialState } from '../initialState'
import * as actions from '../actions/ingredients'

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    cleanIngredientBun: actions.cleanIngredientBun,
    cleanIngredientDetatl: actions.cleanIngredientDetatl,
    cleanIngredientItems: actions.cleanIngredientItems,
    moveIngredientItem: actions.moveIngredientItem,
    removeIngredientItem: actions.removeIngredientItem,
    setIngredientBun: actions.setIngredientBun,
    setIngredientDetatl: actions.setIngredientDetatl,
    setIngredientItem: actions.setIngredientItem,
    setIngredientsList: actions.setIngredientsList,
    setLoading: actions.setLoading,
  },
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
  setIngredientsList,
  setLoading,
} = ingredientsSlice.actions
