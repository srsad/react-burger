import { TIngredientTypes } from '../types/common'

export const DND_TYPES = {
  DROP_TYPES: 'ingredient',
  DRAG_IN_CONSTRUCTOR: 'ingredientInConstructor',
}

// типизировать этот обект
export const TABS_TYPES: {[key in Uppercase<TIngredientTypes>]: TIngredientTypes} = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
}

export const TABS_TYPES_LOCALE = {
  [TABS_TYPES.BUN]: "Булки",
  [TABS_TYPES.SAUCE]: "Соусы",
  [TABS_TYPES.MAIN]: "Начинки",
}

export const INGREDIENT_SECTION_IDS = {
  [TABS_TYPES.BUN]: `ingredient-section_${[TABS_TYPES.BUN]}`,
  [TABS_TYPES.SAUCE]: `ingredient-section_${[TABS_TYPES.SAUCE]}`,
  [TABS_TYPES.MAIN]: `ingredient-section_${[TABS_TYPES.MAIN]}`,
}

export enum ORDER_STATUS {
  CREATED = 'created',
  PENDING = 'pending',
  DONE = 'done',  
}

export enum ORDER_STATUS_LOCALE {
  created = 'Создан',
  pending = 'В работе',
  done = 'Выполнен',  
}

export const APP_PATH = {
  MAIN: '/',

  PROFILE: '/profile',
  ORDERS: '/profile/orders',
  ORDER: '/profile/orders/:id',

  INGREDIENTS_ID: '/ingredients/:id',

  LOGIN: '/login',
  LOGOUT: '/logout',  

  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  FEED: '/feed',
  FEED_ID: '/feed/:id',

  // /feed — страница ленты заказов. Доступен всем пользователям.
  // /feed/:number — страница заказа в ленте. Доступен всем пользователям.
  // /profile/orders — страница истории заказов пользователя. Доступен только авторизованным пользователям.
  // /profile/orders/:number — страница заказа в истории заказов. Доступен

  PAGE_NOT_FOUND_404: '*',
}

export const WS_PATH = {
  ORDERS_ALL: 'wss://norma.nomoreparties.space/orders/all',
  PROFILE_ORDERS_ALL: 'wss://norma.nomoreparties.space/orders',
}
