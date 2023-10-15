import { combineReducers, configureStore } from '@reduxjs/toolkit'

import reducers from './reducers/rootReducer'

const rootReducer = combineReducers({
  ...reducers()
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
})
