import { combineReducers, configureStore, type ActionCreator, type Action } from '@reduxjs/toolkit'
import type { ThunkAction } from 'redux-thunk'

import reducers from './reducers/rootReducer'
import { connect, disconnect, wsClose, wsConnecting, wsError, wsOpen, wsOrders } from './actions/wsOrders'

import { socketMiddleware } from './middleware/socketMiddleware'

const rootReducer = combineReducers({
  ...reducers()
})

const wsActions = {
  onConnect: connect,
  onDisconnect: disconnect,
  onClose: wsClose,
  onOpen: wsOpen,
  onError: wsError,
  onMessage: wsOrders,
  wsConnecting: wsConnecting,
}

export const store = configureStore({
  reducer: rootReducer,
  // @ts-ignore
  middleware: getDafaultMiddleware => getDafaultMiddleware().concat(socketMiddleware(wsActions)),
  devTools: process.env.NODE_ENV === 'development',
})

export type TRootState = ReturnType<typeof rootReducer>
export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, TRootState, unknown, Action>>
export type TAppDispatch = typeof store.dispatch | TAppThunk | any
