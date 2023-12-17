import type { PayloadAction } from '@reduxjs/toolkit'
import type { TInitialStateError } from '../initialState'

export const setError = (state: TInitialStateError, action: PayloadAction<string>) => {
  state.errorMessage = action.payload
}

export const cleanError = (state: TInitialStateError) => {
  state.errorMessage = ''
}
