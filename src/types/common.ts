import type { UUID } from "crypto"

export enum IngredientTypes {
  "bun" = "bun",
  "sauce" = "sauce",
  "main" = "main",
}

export type TIngredientTypes = keyof typeof IngredientTypes

export type TIngredient = {
  _id: string,
  name: string,
  type: TIngredientTypes,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}

export type TIngredientAgregate = TIngredient & {
  uuid: UUID
}
