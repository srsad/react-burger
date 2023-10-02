import apiController from './apiController'

import ingredients from './entities/ingredients'

export const $api = {
  ingredients: ingredients(apiController)
}
