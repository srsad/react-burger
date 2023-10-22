import { createSlice } from "@reduxjs/toolkit"

import { initialStateError as initialState } from '../initialState'
import * as actions from '../actions/errors'

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: { ...actions },
})

export default errorSlice.reducer
export const { setError, cleanError } = errorSlice.actions
