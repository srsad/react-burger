import { createReducer} from "@reduxjs/toolkit"

import { initialStateWS as initialState } from '../initialState'
import { WSStatus } from '../../types/ws'
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsOrders,
} from '../actions/wsOrders'

export const wsReducer = createReducer(initialState, (builder => {
  builder
    .addCase(wsConnecting, (state) => {
      state.wsStatus = WSStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
      state.wsStatus = WSStatus.ONLINE
    })
    .addCase(wsClose, (state) => {
      state.wsStatus = WSStatus.OFFLINE
      state.error = ''
    })
    .addCase(wsError, (state, action) => {
      state.error = action.payload
    })
    .addCase(wsOrders, (state, action) => {
      state.orders = action.payload.orders
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    })
}))
