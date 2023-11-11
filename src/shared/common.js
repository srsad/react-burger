export const DND_TYPES = {
  DROP_TYPES: 'ingredient',
  DRAG_IN_CONSTRUCTOR: 'ingredientInConstructor',
}

export const TABS_TYPES = {
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

  PAGE_NOT_FOUND_404: '*',
}
