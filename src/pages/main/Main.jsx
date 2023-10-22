import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { AppHeader } from "../../components/app-header"
import { BurgerIngredients } from "../../components/burger-ingredients"
import { BurgerConstructor } from "../../components/burger-constructor"
import { ErrorNotificationDetails } from "../../components/error-notification-details"

import cls from "./style.module.css"

import { fetchIngredientsList } from '../../services/actions/ingredients'
import { cleanError } from '../../services/reducers/errorSlice'

const Main = () => {
  const errorNotification = useSelector((state) => state.errors.errorMessage)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIngredientsList())
  }, [dispatch])

  return (
    <div className={cls.main}>
      {!!errorNotification && (
        <ErrorNotificationDetails
          errorText={errorNotification}
          onClose={() => dispatch(cleanError())}
        />
      )}

      <AppHeader />

      <section className={cls.content}>
        <h1 className="pt-10 pb-5 text text_type_main-large">
          Соберите бургер
        </h1>

        <section className={cls.constructor}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />

            <BurgerConstructor />
          </DndProvider>
        </section>
      </section>
    </div>
  )
}

export default Main
