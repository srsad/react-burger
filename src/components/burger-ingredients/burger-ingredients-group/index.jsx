import PropTypes from 'prop-types'

import { BurgerIngredientsItem } from '../burger-ingredients-item'

import { INGREDIENT_SECTION_IDS, TABS_TYPES } from '../../../shared/common'
import componentClasses from './style.module.css'

import { ingredientShape } from '../../../types/common'

export const BurgerIngredientsGroup = ({title, type, ingredientsList}) => {
  const ingredientsCards = ingredientsList.map((ingredient) => (
    <BurgerIngredientsItem ingredient={ingredient} count={55} key={ingredient._id} />
  ))

  return (
    <div id={INGREDIENT_SECTION_IDS[type]} className="pb-10">
      <h3 className="text text_type_main-medium">{title}</h3>

      <section className={componentClasses.wrapper}>
          {ingredientsCards}
      </section>
    </div>
  )
}

BurgerIngredientsGroup.defaultProps = {
  title: '',
  type: TABS_TYPES,
  ingredientsList: []
}

BurgerIngredientsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(TABS_TYPES)).isRequired,
  ingredientsList: PropTypes.arrayOf(ingredientShape)
}