import { type FC, useState } from "react"
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

import { TIngredient, TIngredientTypes } from '../../types/common'

/**
 * Группировка данных по - type
 */
function groupByType(data: TIngredient[]) {
  const grouped: { [key in TIngredientTypes]: TIngredient[] } = {
    bun: [],
    main: [],
    sauce: []
  }

  for (const item of data) {
    if (!grouped[item.type]) {
      grouped[item.type] = []
    }
    grouped[item.type]!.push(item)
  }

  return grouped
}

type TPropsIngredientStatus = {
  title: string
}

type TTabsPositions = {
  [key: string]: number
}

const ingredientStatus: FC<TPropsIngredientStatus> = ({ title }) => (
  <div>
    <h3 className="text text_type_main-medium text-center">{title}</h3>
  </div>
)

export const BurgerIngredients = () => {
  const dispatch = useDispatch()

  const ingredientsList = useSelector((store: any) => store.ingredients.ingredientsList)
  const loading = useSelector((store: any) => store.ingredients.loading)

  /**
   * Детальное окно ингредиента
   */
  function clickToIngredient(ingredient: TIngredient) {
    dispatch(setIngredientDetatl(ingredient))
  }

  /**
   * Установка нового активного таба + скролл к нему
   */
  const [activeTab, setActiveTab] = useState<TIngredientTypes>(TABS_TYPES.BUN)

  // типизировать эту функцию
  function scrollHandler() {
    const container = document.querySelector('.ingredients-container') as HTMLElement
    const items = container ? Array.from(container.querySelectorAll('.burger-ingredients-group') as NodeListOf<HTMLElement>) : []

    const tabsPositions: TTabsPositions = {
      [TABS_TYPES.BUN]: 0,
      [TABS_TYPES.SAUCE]: 0,
      [TABS_TYPES.MAIN]: 0,
    }

    for (const item of items) {
      const type = item.dataset.type as TIngredientTypes;
      tabsPositions[type] = item.getBoundingClientRect().top - container.getBoundingClientRect().top
    }

    const closestTab: TIngredientTypes = findClosestToZeroKey(tabsPositions)

    if (closestTab !== activeTab) {
      setActiveTab(closestTab)
    }
  }

  function findClosestToZeroKey(tabsPositions: TTabsPositions): TIngredientTypes {
    return Object.keys(tabsPositions).reduce((prevKey, currKey) =>
      Math.abs(tabsPositions[currKey]) < Math.abs(tabsPositions[prevKey]) ? currKey : prevKey
    ) as TIngredientTypes
  }
  
  function changeActiveTab(newActiveTab: TIngredientTypes) {
    setActiveTab(newActiveTab)

    const ingredientsContainer = document.getElementById(
      INGREDIENT_SECTION_IDS[newActiveTab]
    )
    ingredientsContainer!.scrollIntoView({ block: "start", behavior: "smooth" })
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
