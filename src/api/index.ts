import auth from "./entities/auth"
import ingredients from "./entities/ingredients"
import orders from "./entities/orders"

export const $api = {
  auth: auth(),
  ingredients: ingredients(),
  orders: orders(),
}
