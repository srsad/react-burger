import { useRef } from 'react'
import PropTypes from "prop-types"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'

import { removeIngredientItem, moveIngredientItem } from '../../../services/reducers/ingredientsSlice'

import { ingredientShapeAgregate } from "../../../types/common"
import { DND_TYPES } from "../../../shared/common"

import cls from './style.module.css'

export const BurgerConstructorItem = ({ agregateIngridient, index }) => {
  const dispatch = useDispatch()

  const itemRef = useRef(null)

  const newPosition = {
    newIndex: 0,
    oldIndex: 0
  }

  const [, dropRef] = useDrop({
    accept: DND_TYPES.DRAG_IN_CONSTRUCTOR,
    drop() {
      dispatch(moveIngredientItem(newPosition))
    },
    hover(el) {
      const oldIndex = el.index
      const newIndex = index

      if (newIndex === oldIndex) return

      if ((newIndex < oldIndex) || (newIndex > oldIndex)) {
        newPosition.newIndex = newIndex
        newPosition.oldIndex = oldIndex
      }
    },
  })

  const [{ isDragging }, dragRef] = useDrag({
    type: DND_TYPES.DRAG_IN_CONSTRUCTOR,
    item: { id: agregateIngridient._id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const dragStyle = {
    opacity: isDragging ? 0.2 : 1,
  }

  dragRef(dropRef(itemRef))

  return (
    <div
      className={cls.element}
      ref={itemRef}
      style={dragStyle}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={agregateIngridient.name}
        price={agregateIngridient.price}
        thumbnail={agregateIngridient.image}
        handleClose={() => dispatch(removeIngredientItem(agregateIngridient.uuid))}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  agregateIngridient: ingredientShapeAgregate.isRequired,
  index: PropTypes.number.isRequired,
}
