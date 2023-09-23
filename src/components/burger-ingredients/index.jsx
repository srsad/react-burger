import { useState } from 'react'
import PropTypes from 'prop-types'

import { BurgerIngredientsTabs } from './burger-ingredients-tabs'
import { BurgerIngredientsGroup } from './burger-ingredients-group'
import { TABS_TYPES, TABS_TYPES_LOCALE, INGREDIENT_SECTION_IDS } from '../../shared/common'

import componentClasses from './style.module.css'

import { ingredientShape } from '../../types/common'

/**
 * Группировка данных по - type
 */
function groupByType(data) {
  const grouped = {};

  for (const item of data) {
    if (!grouped[item.type]) {
      grouped[item.type] = [];
    }
    grouped[item.type].push(item);
  }

  return grouped;
}

export const BurgerIngredients = ({ ingredientsList }) => {
  const [activeTab, setActiveTab] = useState(TABS_TYPES.BUN)

  /**
   * Установка нового активного таба + скролл к нему
   */
  function changeActiveTab(newActiveTab) {
    setActiveTab(newActiveTab)

    const ingredientsContainer = document.getElementById(INGREDIENT_SECTION_IDS[newActiveTab])
    ingredientsContainer.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const groupingIngredientsList = groupByType(ingredientsList)

  return (
    <div>
      <div>
        <BurgerIngredientsTabs
          activeTabItem={activeTab}
          callback={changeActiveTab}
        />

        <section className={`${componentClasses.ingredients} ingredients-container custom-scroll`}>
          <BurgerIngredientsGroup
            title={TABS_TYPES_LOCALE[TABS_TYPES.BUN]}
            ingredientsList={groupingIngredientsList[TABS_TYPES.BUN]}
            type={TABS_TYPES.BUN}
          />
          
          <BurgerIngredientsGroup
            title={TABS_TYPES_LOCALE[TABS_TYPES.SAUCE]}
            ingredientsList={groupingIngredientsList[TABS_TYPES.SAUCE]}
            type={TABS_TYPES.SAUCE}
          />
          
          <BurgerIngredientsGroup
            title={TABS_TYPES_LOCALE[TABS_TYPES.MAIN]}
            ingredientsList={groupingIngredientsList[TABS_TYPES.MAIN]}
            type={TABS_TYPES.MAIN}
          />
        </section>
      </div>
    </div>
  )
}

BurgerIngredients.defaultProps = {
  ingredientsList: []
}

BurgerIngredients.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientShape).isRequired
}
