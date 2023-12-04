import type { ActionCreatorWithOptionalPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit'

export type TWSActions = {
  onConnect: ActionCreatorWithOptionalPayload<string>,
  onDisconnect: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithOptionalPayload<string>,
  wsConnecting: ActionCreatorWithoutPayload,
  onMessage: ActionCreatorWithOptionalPayload<any>,
}

export enum WSStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type TWSStatus = keyof typeof WSStatus
