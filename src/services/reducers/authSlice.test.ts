import crypto from 'crypto'

import { initialStateAuth as initialState } from '../initialState'
import reducer, {
  removeToken,
  setAuthData,
  setToken,
} from './authSlice'

const localStorageMock = (function () {
  let store: {[key: string]: any} = {}

  return {
    getItem(key: string) {
      return store[key]
    },
    setItem(key: string, value: string) {
      store[key] = value
    },
    clear() {
      store = {}
    },
    removeItem(key: string) {
      delete store[key]
    },
    getAll() {
      return store
    },
  }
})()

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const MOCK_ACCESS_TOKEN = 'Bearer ' + crypto.randomUUID()
const MOCK_REFRESH_TOKEN = crypto.randomUUID()

describe('Reducer authSlice', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test('Should be in its initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ ...initialState })
  })

  test('Should set the tokens - setToken', () => {
    const action = {
      type: setToken,
      payload: {
        accessToken: MOCK_ACCESS_TOKEN,
        refreshToken: MOCK_REFRESH_TOKEN,
      }
    }

    reducer(initialState, action)

    expect(localStorage.getItem('accessToken')).toEqual(MOCK_ACCESS_TOKEN)
    expect(localStorage.getItem('refreshToken')).toEqual(MOCK_REFRESH_TOKEN)
  })

  test('Must remove the tokens - removeToken', () => {
    localStorage.setItem('accessToken', MOCK_ACCESS_TOKEN)
    localStorage.setItem('refreshToken', MOCK_REFRESH_TOKEN)

    const action = {
      type: removeToken
    }

    expect(localStorage.getItem('accessToken')).toEqual(MOCK_ACCESS_TOKEN)
    expect(localStorage.getItem('refreshToken')).toEqual(MOCK_REFRESH_TOKEN)

    reducer(initialState, action)

    expect(localStorage.getItem('accessToken')).toEqual(undefined)
    expect(localStorage.getItem('refreshToken')).toEqual(undefined)
  })

  test('Should set the data after authorization - setAuthData', () => {
    const payload = {
      name: 'UserName',
      email: 'user.email@qa.com',
    }

    const action = {
      type: setAuthData,
      payload,
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...payload
    })
  })
})
