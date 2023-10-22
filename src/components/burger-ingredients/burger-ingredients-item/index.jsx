import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import { useDrag } from "react-dnd";

import cls from "./style.module.css"

import { ingredientShape } from "../../../types/common"
import { DND_TYPES } from "../../../shared/common"

export const BurgerIngredientsItem = ({ ingredient, count, handleClick }) => {
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
  )
}

BurgerIngredientsItem.propTypes = {
  count: PropTypes.number.isRequired,
  ingredient: ingredientShape.isRequired,
  handleClick: PropTypes.func.isRequired,
}
