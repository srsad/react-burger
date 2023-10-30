import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useLocation } from "react-router-dom"
import { useDrag } from "react-dnd"
import PropTypes from "prop-types"

import cls from "./style.module.css"
import { ingredientShape } from "../../../types/common"

import { DND_TYPES } from "../../../shared/common"

export const BurgerIngredientsItem = ({ ingredient, count, handleClick }) => {
  const location = useLocation()

	const [{ isDragging }, ingredientDragRef] = useDrag({
		type: DND_TYPES.DROP_TYPES,
		item: ingredient,
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
  })

  const dragStyle = {
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ backgroundLocation: location }}
      className={cls.wrapper}
    >
      <figure
        className={`${cls.item} mt-6`}
        onClick={() => handleClick(ingredient)}
        ref={ingredientDragRef}
        style={dragStyle}
      >
        <img className={cls.image} src={ingredient.image} alt={ingredient.name} />

        <figcaption>
          <p className={`${cls.price} text text_type_digits-default mr-2`}>
            {ingredient.price}
            <CurrencyIcon type="primary" />
          </p>

          <p className={`${cls.name} text text_type_main-default`}>
            {ingredient.name}
          </p>

          {!!count && (
            <p className={cls.count}>
              <Counter count={count} size="default" />
            </p>
          )}
        </figcaption>
      </figure>
    </Link>
  )
}

BurgerIngredientsItem.propTypes = {
  count: PropTypes.number.isRequired,
  ingredient: ingredientShape.isRequired,
  handleClick: PropTypes.func.isRequired,
}
