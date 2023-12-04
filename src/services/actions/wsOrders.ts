import { createAction } from "@reduxjs/toolkit"
import type { TWSOrdersResponse } from '../../types/api'

const WS_CONNECT = 'WS_CONNECT'
const WS_DISCONNECT = 'WS_DISCONNECT'
const WS_CONNECTING = 'WS_CONNECTING'
const WS_OPEN = 'WS_OPEN'
const WS_CLOSE = 'WS_CLOSE'
const WS_ERROR = 'WS_ERROR'

const WS_ORDERS = 'WS_ORDERS'

export const connect = createAction<string, typeof WS_CONNECT>(WS_CONNECT)
export const disconnect = createAction(WS_DISCONNECT)
export const wsConnecting = createAction(WS_CONNECTING)
export const wsOpen = createAction(WS_OPEN)
export const wsClose = createAction(WS_CLOSE)
export const wsError = createAction<string, typeof WS_ERROR>(WS_ERROR)

export const wsOrders = createAction<TWSOrdersResponse, typeof WS_ORDERS>(WS_ORDERS)

export type TWsActions = ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsOrders>
