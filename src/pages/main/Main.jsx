import { useEffect, useState } from 'react'

import { $api } from '../../api'

import { AppHeader } from '../../components/app-header'
import { BurgerConstructor } from '../../components/burger-constructor'
import { BurgerIngredients } from '../../components/burger-ingredients'
import { ErrorNotificationDetails } from '../../components/error-notification-details'
import { checkReponse } from '../../utils/common'

import cls from './style.module.css'

const Main = () => {
  const [ingredients, setIngredients] = useState([])
  const [errorNotification, setErrorNotification] = useState('')
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
      const errorMessage = 'Не удалось получить список ингредиентов'
      console.error(errorMessage, error)
      setErrorNotification(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cls.main}>
      {errorNotification && (
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
          <BurgerIngredients ingredientsList={ingredients} loading={loading} />

          <BurgerConstructor ingredientsList={ingredients} />
        </section>
      </section>
    </div>
  );
}

export default Main