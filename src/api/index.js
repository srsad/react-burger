import apiController from "./apiController"

import ingredients from "./entities/ingredients"
import orders from "./entities/orders"

export const $api = {
  ingredients: ingredients(apiController),
  orders: orders(apiController),
}
