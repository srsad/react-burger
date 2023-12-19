import { initialStateOrder as initialState, type TInitialStateOrder } from '../initialState'

import reducer, {
  cleanDetailOrder,
  cleanOrder,
  setDetailOrder,
  setOrder,
} from './orderSlice'

import { MOCK_WS_ORDERS } from '../../shared/mock'

const MOCK_ORDER_PAYLOAD = {
  name: 'Burger name',
  order: {
    number: 123654
  }
}

describe('Reducer orderSlice', () => {
  test('Should be in its initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ ...initialState })
  })

  test('should be order data must be set - setOrder', () => {
    const action = {
      type: setOrder,
      payload: MOCK_ORDER_PAYLOAD,
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...MOCK_ORDER_PAYLOAD,
    })
  })

  test('should be order data cleared - cleanOrder', () => {
    const mockState: TInitialStateOrder = {
      ...initialState,
      ...MOCK_ORDER_PAYLOAD
    }

    const action = {
      type: cleanOrder
    }

    expect(reducer(mockState, action)).toEqual({ ...initialState })
  })

  test('Should be set  data for the order detail should be set - setDetailOrder', () => {
    const payload = {
      orders: MOCK_WS_ORDERS
    }

    const action = {
      type: setDetailOrder,
      payload,
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      detailOrder: MOCK_WS_ORDERS[0],
    })
  })

  test('Should be deletion of data from the order detail - cleanDetailOrder', () => {
    const mockState: TInitialStateOrder = {
      ...initialState,
      detailOrder: MOCK_WS_ORDERS[0],
    }

    const action = {
      type: cleanDetailOrder
    }

    expect(reducer(mockState, action)).toEqual({ ...initialState })
  })
})
