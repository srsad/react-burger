import type { TIngredient, TIngredientAgregate } from '../types/common'
import type { TOrder } from "../types/api"
import { WSStatus, type TWSStatus } from "../types/ws"

export type TInitialStateIngredients = {
  loading: boolean,
  ingredientsList: TIngredient[],
  burgerConstructor: {
    bun: TIngredientAgregate | null,
    items: TIngredientAgregate[]
  },
  ingredientDetatl: TIngredient | null,
}

export const initialStateIngredients: TInitialStateIngredients = {
  loading: true,
  // список всех полученных ингредиентов
  ingredientsList: [],
  // список всех ингредиентов в текущем конструкторе бургера
  burgerConstructor: {
    bun: null,
    items: []
  },
  // объект текущего просматриваемого ингредиента
  ingredientDetatl: null,
}

export type TInitialStateOrder = {
  name: string,
  order: {
    number: null | number,
  },
  detailOrder: null | TOrder,
}

export const initialStateOrder: TInitialStateOrder = {
  name: '',
  order: {
    number: null,
  },
  detailOrder: null,
}

export type TInitialStateError = {
  errorMessage: string
}

export const initialStateError: TInitialStateError = {
  // сообщение об ошибке
  errorMessage: '',
}

export type TInitialStateAuth = {
  name: string,
  email: string,
}

export const initialStateAuth: TInitialStateAuth = {
  name: '',
  email: '',
} 

export type TWSState = {
  total: number
  totalToday: number,
  orders: TOrder[],
  wsStatus: TWSStatus,
  error: string,
}

export const initialStateWS: TWSState = {
  total: 0,
  totalToday: 0,
  orders: [],
  wsStatus: WSStatus.OFFLINE,
  error: '',
}
