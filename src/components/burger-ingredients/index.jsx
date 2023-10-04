import PropTypes from 'prop-types'
import { useContext, useState } from 'react'

import { INGREDIENT_SECTION_IDS, TABS_TYPES, TABS_TYPES_LOCALE } from '../../shared/common'
import { IngredientDetails } from '../burger-ingredient-details'
import { Modal } from '../ui/modal'
import { BurgerIngredientsGroup } from './burger-ingredients-group'
import { BurgerIngredientsTabs } from './burger-ingredients-tabs'

import cls from './style.module.css'

import { IngredientContext } from '../../services/ingredientContext'

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

export const BurgerIngredients = ({ loading }) => {
  const [ingredientsList] = useContext(IngredientContext)

  /**
   * Детальное окно ингредиента
  */
  const [showModal, setShowModal] = useState(false)
  const [activeIngredient, setActiveIngredient] = useState(null)

  function clickToIngredient(ingredient) {
    setActiveIngredient(ingredient)
    setShowModal(true)
  }
  
  function closeModal() {
    setActiveIngredient(null)
    setShowModal(false)
  }
  
  /**
   * Установка нового активного таба + скролл к нему
  */
  const [activeTab, setActiveTab] = useState(TABS_TYPES.BUN)
  function changeActiveTab(newActiveTab) {
    setActiveTab(newActiveTab)

    const ingredientsContainer = document.getElementById(INGREDIENT_SECTION_IDS[newActiveTab])
    ingredientsContainer.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const groupingIngredientsList = groupByType(ingredientsList)

  if (loading) {
    return ingredientStatus({title: 'Загрузка ...'})
  }

  if (!loading && !ingredientsList.length) {
    return ingredientStatus({title: 'Нет ингридиентов =('})
  }

  return (
    <div>
      {showModal && (
        <Modal onClose={closeModal} titlle="Детали ингредиента">
          <IngredientDetails ingredient={activeIngredient} />
        </Modal>
      )}

      <BurgerIngredientsTabs
        activeTabItem={activeTab}
        callback={changeActiveTab}
      />

      <section className={`${cls.ingredients} ingredients-container custom-scroll`}>
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

BurgerIngredients.defaultProps = {
  loading: true
}

BurgerIngredients.propTypes = {
  loading: PropTypes.bool.isRequired
}
