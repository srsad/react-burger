import { ingredientShape } from "../../types/common"
import cls from "./style.module.css"

export const IngredientDetails = ({ ingredient }) => {
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

IngredientDetails.propTypes = {
  ingredient: ingredientShape.isRequired,
}
