import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import {
  INGREDIENT_SECTION_IDS,
  TABS_TYPES,
  TABS_TYPES_LOCALE,
} from "../../shared/common"
import { BurgerIngredientsGroup } from "./burger-ingredients-group"
import { BurgerIngredientsTabs } from "./burger-ingredients-tabs"

import { setIngredientDetatl } from '../../services/reducers/ingredientsSlice'

import cls from "./style.module.css"

/**
 * Группировка данных по - type
 */
function groupByType(data) {
  const grouped = {}

  for (const item of data) {
    if (!grouped[item.type]) {
      grouped[item.type] = []
    }
    grouped[item.type].push(item)
  }

  return grouped
}

const ingredientStatus = ({ title }) => (
  <div>
    <h3 className="text text_type_main-medium text-center">{title}</h3>
  </div>
)

export const BurgerIngredients = () => {
  const dispatch = useDispatch()

  const ingredientsList = useSelector((store) => store.ingredients.ingredientsList)
  const loading = useSelector((store) => store.ingredients.loading)

  /**
   * Детальное окно ингредиента
   */
  function clickToIngredient(ingredient) {
    dispatch(setIngredientDetatl(ingredient))
  }

  /**
   * Установка нового активного таба + скролл к нему
   */
  const [activeTab, setActiveTab] = useState(TABS_TYPES.BUN)

  function scrollHandler() {
    const container = document.querySelector('.ingredients-container')
    const items = container.querySelectorAll('.burger-ingredients-group')

    const tabsPositions = {
      [TABS_TYPES.BUN]: 0,
      [TABS_TYPES.SAUCE]: 0,
      [TABS_TYPES.MAIN]: 0,
    }

    for (const item of items) {
      tabsPositions[item.dataset.type] = item.getBoundingClientRect().top - container.getBoundingClientRect().top
    }

    const closestTab = findClosestToZeroKey(tabsPositions)

    if (closestTab !== activeTab) {
      setActiveTab(closestTab)
    }
  }

  function findClosestToZeroKey(tabsPositions) {
    return Object.keys(tabsPositions).reduce((prevKey, currKey) =>
      Math.abs(tabsPositions[currKey]) < Math.abs(tabsPositions[prevKey]) ? currKey : prevKey
    )
  }
  
  function changeActiveTab(newActiveTab) {
    setActiveTab(newActiveTab)

    const ingredientsContainer = document.getElementById(
      INGREDIENT_SECTION_IDS[newActiveTab]
    )
    ingredientsContainer.scrollIntoView({ block: "start", behavior: "smooth" })
  }

  const groupingIngredientsList = groupByType(ingredientsList)

  if (loading) {
    return ingredientStatus({ title: "Загрузка ..." })
  }

  if (!loading && !ingredientsList.length) {
    return ingredientStatus({ title: "Нет ингридиентов =(" })
  }

  return (
    <div>
      <BurgerIngredientsTabs
        activeTabItem={activeTab}
        callback={changeActiveTab}
      />

      <section
        className={`${cls.ingredients} ingredients-container custom-scroll`}
        onScroll={scrollHandler}
      >
        <BurgerIngredientsGroup
          title={TABS_TYPES_LOCALE[TABS_TYPES.BUN]}
          ingredientsList={groupingIngredientsList[TABS_TYPES.BUN]}
          type={TABS_TYPES.BUN}
          handleClick={clickToIngredient}
        />

        <BurgerIngredientsGroup
          title={TABS_TYPES_LOCALE[TABS_TYPES.SAUCE]}
          ingredientsList={groupingIngredientsList[TABS_TYPES.SAUCE]}
          type={TABS_TYPES.SAUCE}
          handleClick={clickToIngredient}
        />

        <BurgerIngredientsGroup
          title={TABS_TYPES_LOCALE[TABS_TYPES.MAIN]}
          ingredientsList={groupingIngredientsList[TABS_TYPES.MAIN]}
          type={TABS_TYPES.MAIN}
          handleClick={clickToIngredient}
        />
      </section>
    </div>
  )
}
