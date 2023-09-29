import { useEffect, useState } from 'react'

import { $api } from '../../api'

import { AppHeader } from '../../components/app-header'
import { BurgerConstructor } from '../../components/burger-constructor'
import { BurgerIngredients } from '../../components/burger-ingredients'

import cls from './style.module.css'

const Main = () => {
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getIngredients()
  }, [])

  async function getIngredients() {
    setLoading(true)
    try {
      const response = await $api.ingredients.getIngredients()
      const { data } = await response.json()
      setIngredients(data)
    } catch (error) {
      console.error('Не удалось получить список ингредиентов', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cls.main}>
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