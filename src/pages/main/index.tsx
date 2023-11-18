import type { FC } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { BurgerIngredients } from "../../components/burger-ingredients"
import { BurgerConstructor } from "../../components/burger-constructor"

import cls from "./style.module.css"

export const Main: FC = () => {
  return (
    <div className={cls.main}>
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
