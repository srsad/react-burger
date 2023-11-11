import apiController from "./apiController"

import auth from "./entities/auth"
import ingredients from "./entities/ingredients"
import orders from "./entities/orders"

export const $api = {
  auth: auth(apiController),
  ingredients: ingredients(apiController),
  orders: orders(apiController),
}
