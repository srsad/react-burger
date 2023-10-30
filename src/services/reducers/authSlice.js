import { createSlice } from "@reduxjs/toolkit"

import { initialStateAuth as initialState } from '../initialState'
import * as actions from '../actions/auth'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { ...actions },
})

export default authSlice.reducer
export const {
  setAuthData,
  setToken,
  removeToken,
} = authSlice.actions
