import api from "../apiController"
import { TOrderReques, TOrderResponse } from "../../types/api"

export default function orders() {
  return {
    createOrder(ingredientsList: TOrderReques) {
      return api<TOrderResponse>("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ ingredients: ingredientsList }),
      })
    },
  }
}
