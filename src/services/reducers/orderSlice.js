import { createSlice } from "@reduxjs/toolkit"

import { initialStateOrder as initialState } from '../initialState'
import * as actions from '../actions/order'

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: { ...actions },
})

export default orderSlice.reducer
export const { setOrder, cleanOrder } = orderSlice.actions
