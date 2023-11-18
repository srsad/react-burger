import api from "../apiController"
import { TIngredientResponse } from "../../types/api"

export default function ingredients() {
  return {
    getIngredients() {
      return api<TIngredientResponse>("/api/ingredients")
    },
  }
}
