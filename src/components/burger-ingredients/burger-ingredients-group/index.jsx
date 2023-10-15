import PropTypes from "prop-types"
import { useSelector } from 'react-redux'

import { BurgerIngredientsItem } from "../burger-ingredients-item"

import { INGREDIENT_SECTION_IDS, TABS_TYPES } from "../../../shared/common"
import cls from "./style.module.css"

import { ingredientShape } from "../../../types/common"

const QUANTITY_FOR_BUN_BE_USED = 2

export const BurgerIngredientsGroup = ({
  title,
  type,
  ingredientsList,
  handleClick,
}) => {
  // используемые булочки
  const usedBuns = useSelector((store) => store.ingredients.burgerConstructor.bun)
  // используемое все остольное
  const usedOtherTopings = useSelector((store) => store.ingredients.burgerConstructor.items)

  const ingredientsCards = ingredientsList.map((ingredient) => (
    <BurgerIngredientsItem
      ingredient={ingredient}
      count={getIngredientCount(ingredient)}
      key={ingredient._id}
      handleClick={handleClick}
    />
  ))

  function getIngredientCount(ingredient) {
    let result = 0
    if (
      usedBuns &&
      ingredient.type === TABS_TYPES.BUN &&
      ingredient._id === usedBuns._id
    ) {
      return QUANTITY_FOR_BUN_BE_USED
    }

    if (usedOtherTopings.length) {
      result = usedOtherTopings.filter(el => el._id === ingredient._id).length
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

BurgerIngredientsGroup.defaultProps = {
  title: "",
  type: TABS_TYPES,
  ingredientsList: [],
  handleClick: () => {},
}

BurgerIngredientsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(TABS_TYPES)).isRequired,
  ingredientsList: PropTypes.arrayOf(ingredientShape),
  handleClick: PropTypes.func.isRequired,
}
