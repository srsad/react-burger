import { initialStateWS as initialState, type TWSState } from '../initialState'
import { WSStatus } from "../../types/ws"

import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsOrders,
} from '../actions/wsOrders'
import { wsReducer as reducer } from './wsOrdersSlice'
import { MOCK_WS_ORDERS } from '../../shared/mock'

const mockState: TWSState = {
  total: 22,
  totalToday: 5,
  orders: [...MOCK_WS_ORDERS],
  wsStatus: WSStatus.OFFLINE,
  error: '',
}

const ERROR_MESSAGE = 'Error message'

describe('Reducer wsOrdersSlice', () => {
  test('Should be in its initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ ...initialState })
  })

  test('Should change its status to "CONNECTING" - wsConnecting', () => {
    const action = {
      type: wsConnecting,
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      wsStatus: WSStatus.CONNECTING,
    })
  })

  test('Should change its status to "ONLINE" - wsOpen', () => {
    const action = {
      type: wsOpen,
    }

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      wsStatus: WSStatus.ONLINE,
    })
  })

  test('Should change its status to "OFLINE" - wsClose', () => {
    const action = {
      type: wsClose,
    }

    const mockStateWithOtherStatus = {
      ...initialState,
      wsStatus: WSStatus.ONLINE,
      error: ERROR_MESSAGE,
    }

    expect(reducer(mockStateWithOtherStatus, action)).toEqual({ ...initialState })
  })

  test('Should occur an error setting - wsError', () => {
    const action = {
      type: wsError,
      payload: ERROR_MESSAGE
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: ERROR_MESSAGE,
    })
  })

  test('Should load orders - wsOrders', () => {
    const action = {
      type: wsOrders,
      payload: {
        total: 22,
        totalToday: 5,
        orders: [...MOCK_WS_ORDERS],
      },
    }

    expect(reducer(initialState, action)).toEqual({ ...mockState })
  })
})

