import { useEffect, FC } from "react"
import { useParams } from "react-router-dom"

import cls from "./style.module.css"
import { setIngredientDetatl } from "../../services/reducers/ingredientsSlice"
import { TIngredient } from "../../types/common"

import { useAppDispatch, useAppSelector } from '../../hooks/useStore'

type TParams = {
  id: string
}

export const IngredientDetails: FC = () => {
  const dispatch = useAppDispatch()
  const ingredient = useAppSelector((state) => state.ingredients.ingredientDetatl)
  const ingredientsList = useAppSelector((state) => state.ingredients.ingredientsList)
  const { id } = useParams<TParams>()

  useEffect(() => {
    if (!ingredient) {
      const selectIngredient = ingredientsList.find((el: TIngredient) => el._id === id)
      dispatch(setIngredientDetatl(selectIngredient as TIngredient))
    }
  }, [dispatch, ingredientsList, ingredient, id])

  if (!ingredient) {
    return (
      <div className={cls.card}>
        {/*  */}
      </div>
    )
  }

  return (
    <div className={cls.card}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={cls.image}
      />

      <p className="text text_type_main-medium">{ingredient.name}</p>

      <div className={cls.details}>
        <section>
          <p className="text text_type_main-default text_color_inactive text-center mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive text-center">
            {ingredient.calories}
          </p>
        </section>
        <section>
          <p className="text text_type_main-default text_color_inactive text-center mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive text-center">
            {ingredient.proteins}
          </p>
        </section>
        <section>
          <p className="text text_type_main-default text_color_inactive text-center mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive text-center">
            {ingredient.fat}
          </p>
        </section>
        <section>
          <p className="text text_type_main-default text_color_inactive text-center mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive text-center">
            {ingredient.carbohydrates}
          </p>
        </section>
      </div>
    </div>
  )
}
