import api from "../apiController"
import { TOrderResponse, TDetailOrderResponse } from "../../types/api"

export default function orders() {
  return {
    createOrder(ingredientsList: string[]) {
      return api<TOrderResponse>("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ ingredients: ingredientsList }),
      })
    },

    getOrderByNumber(orderNumber: string) {
      return api<TDetailOrderResponse>(`/api/orders/${orderNumber}`)
    }
  }
}
