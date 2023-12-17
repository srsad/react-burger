import { initialStateError as initialState, type TInitialStateError } from '../initialState'
import reducer, {
  setError,
  cleanError,
} from './errorSlice'

const ERROR_MESSAGE = 'Error message: some error...'

describe('Reducer errorSlice', () => {

  test('Should be in its initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ ...initialState })
  })

  test('Should set the errors in the state - setError', () => {
    const action = {
      type: setError,
      payload: ERROR_MESSAGE,
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      errorMessage: ERROR_MESSAGE
    })
  })

  test('should clear the error from the stats - cleanError', () => {
    const mockState: TInitialStateError = {
      errorMessage: ERROR_MESSAGE
    }

    const action = {
      type: cleanError
    }

    expect(reducer(mockState, action)).toEqual({ ...initialState })
  })
})
