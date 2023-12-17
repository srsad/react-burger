import type { Middleware, MiddlewareAPI } from 'redux'

import type { TAppDispatch, TRootState } from "../store"
import type { TWSActions } from "../../types/ws"

export const socketMiddleware= (wsActions: TWSActions): Middleware<{}, TRootState> => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null
    let isConnected = false
    let reconnectedTimer = 0
    let url = ''

    return (next) => (action) => {
      const { dispatch } = store

      if (wsActions.onConnect.match(action)) {
        url = action.payload
        socket = new WebSocket(url)
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsActions.onOpen())
        }

        socket.onerror = (event) => {
          dispatch(wsActions.onError(event.type))
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          dispatch(wsActions.onMessage(parsedData))
        }

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(wsActions.onError(event.code.toString()))
          }

          dispatch(wsActions.onClose())

          if (isConnected) {
            dispatch(wsActions.wsConnecting())
            reconnectedTimer = window.setTimeout(() => {
              dispatch(wsActions.onConnect(url))
            }, 3000)
          }
        }

        if (wsActions.onDisconnect.match(action)) {
          clearTimeout(reconnectedTimer)
          isConnected = false
          reconnectedTimer = 0
          socket.close()
          dispatch(wsActions.onClose())
        }
      }
      next(action)
    }
  })
}
