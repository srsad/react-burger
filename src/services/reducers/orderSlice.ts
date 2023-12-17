import { createSlice } from "@reduxjs/toolkit"

import { initialStateOrder as initialState } from '../initialState'
import * as actions from '../actions/order'

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: actions.setOrder,
    cleanOrder: actions.cleanOrder,
    setDetailOrder: actions.setDetailOrder,
    cleanDetailOrder: actions.cleanDetailOrder,
  },
})

export default orderSlice.reducer
export const {
  setOrder,
  cleanOrder,
  setDetailOrder,
  cleanDetailOrder,
} = orderSlice.actions
