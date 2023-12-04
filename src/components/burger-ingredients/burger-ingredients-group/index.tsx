import { FC } from 'react'

import { BurgerIngredientsItem } from "../burger-ingredients-item"

import { INGREDIENT_SECTION_IDS, TABS_TYPES } from "../../../shared/common"
import cls from "./style.module.css"

import { IngredientTypes, TIngredient } from "../../../types/common"

import { useAppSelector } from '../../../hooks/useStore'

type TProps = {
  title?: string,
  type: keyof typeof IngredientTypes,
  ingredientsList: TIngredient[],
  handleClick: (arg: TIngredient) => void,
}

const QUANTITY_FOR_BUN_BE_USED: number = 2

export const BurgerIngredientsGroup: FC<TProps> = ({
  title = "",
  type = "bun",
  ingredientsList = [],
  handleClick = () => {},
}) => {
  // используемые булочки
  const usedBuns = useAppSelector((store) => store.ingredients.burgerConstructor.bun)
  // используемое все остольное
  const usedOtherTopings = useAppSelector((store) => store.ingredients.burgerConstructor.items)

  const ingredientsCards = ingredientsList.map((ingredient: TIngredient) => (
    <BurgerIngredientsItem
      ingredient={ingredient}
      count={getIngredientCount(ingredient)}
      key={ingredient._id}
      handleClick={handleClick}
    />
  ))

  function getIngredientCount(ingredient: TIngredient): number {
    let result = 0
    if (
      usedBuns &&
      ingredient.type === TABS_TYPES.BUN &&
      ingredient._id === usedBuns._id
    ) {
      return QUANTITY_FOR_BUN_BE_USED
    }

    if (usedOtherTopings.length) {
      result = usedOtherTopings.filter((el: TIngredient) => el._id === ingredient._id).length
    }
  
    return result
  }

  return (
    <div id={INGREDIENT_SECTION_IDS[type]} className="pb-10">
      <h3 className="text text_type_main-medium burger-ingredients-group" data-type={type}>{title}</h3>

      <section className={cls.wrapper}>{ingredientsCards}</section>
    </div>
  )
}
