export const TABS_TYPES = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',   
}

export const TABS_TYPES_LOCALE = {
  [TABS_TYPES.BUN]: 'Булки',
  [TABS_TYPES.SAUCE]: 'Соусы',
  [TABS_TYPES.MAIN]: 'Начинки',
}

export const INGREDIENT_SECTION_IDS = {
  [TABS_TYPES.BUN]: `ingredient-section_${[TABS_TYPES.BUN]}`,
  [TABS_TYPES.SAUCE]: `ingredient-section_${[TABS_TYPES.SAUCE]}`,
  [TABS_TYPES.MAIN]: `ingredient-section_${[TABS_TYPES.MAIN]}`,
}
