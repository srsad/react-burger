import { useEffect, useState } from 'react'

import { $api } from '../../api'

import { AppHeader } from '../../components/app-header'
import { BurgerConstructor } from '../../components/burger-constructor'
import { BurgerIngredients } from '../../components/burger-ingredients'
import { ErrorNotificationDetails } from '../../components/error-notification-details'
import { checkReponse } from '../../utils/common'

import { ErrorContext } from '../../services/errorContext'
import { IngredientContext } from '../../services/ingredientContext'
import { OrderContext } from '../../services/orderContext'

import cls from './style.module.css'

const Main = () => {
  const ingredientsState = useState([])
  const orderState = useState([])
  const [ingredients, setIngredients] = ingredientsState

  const errorState = useState('')
  const [errorNotification, setErrorNotification] = errorState
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getIngredients()
  }, [])

  async function getIngredients() {
    setLoading(true)
    try {
      const response = await $api.ingredients.getIngredients()
      const { data } = await checkReponse(response)
      setIngredients(data)
    } catch (error) {
      const errorMessage = 'Не удалось получить список ингредиентов!'
      console.error(errorMessage, error)
      setErrorNotification(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cls.main}>
      {!!errorNotification && (
        <ErrorNotificationDetails
          errorText={errorNotification}
          onClose={() => setErrorNotification('')}
        />
      )}

      <AppHeader />

      <section className={cls.content}>
        <h1 className="pt-10 pb-5 text text_type_main-large">
          Соберите бургер
        </h1>

        <section className={cls.constructor}>
          <ErrorContext.Provider value={errorState}>
            <IngredientContext.Provider value={ingredientsState}>
              <BurgerIngredients loading={loading} />

              <OrderContext.Provider value={orderState}>
                <BurgerConstructor ingredientsList={ingredients} />
              </OrderContext.Provider>
            </IngredientContext.Provider>
          </ErrorContext.Provider>
        </section>
      </section>
    </div>
  );
}

export default Main