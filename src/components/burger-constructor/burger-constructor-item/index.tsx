import { useRef, FC } from 'react'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'

import { removeIngredientItem, moveIngredientItem } from '../../../services/reducers/ingredientsSlice'
import { DND_TYPES } from "../../../shared/common"
import { TIngredientAgregate } from "../../../types/common"

import cls from './style.module.css'

import { useAppDispatch } from '../../../hooks/useStore'

type TProps = {
  agregateIngredient: TIngredientAgregate,
  index: number,
}

type THoverDropElement = {
  id: string,
  index: number,
}

type TPosition = {
  newIndex: number,
  oldIndex: number,  
}

export const BurgerConstructorItem: FC<TProps> = ({ agregateIngredient, index }) => {
  const dispatch = useAppDispatch()

  const itemRef = useRef<HTMLDivElement>(null)

  const newPosition: TPosition = {
    newIndex: 0,
    oldIndex: 0
  }

  const [, dropRef] = useDrop({
    accept: DND_TYPES.DRAG_IN_CONSTRUCTOR,
    drop() {
      dispatch(moveIngredientItem(newPosition))
    },
    hover(el: THoverDropElement) {
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
    item: { id: agregateIngredient._id, index },
    collect: (monitor: DragSourceMonitor) => ({
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
        text={agregateIngredient.name}
        price={agregateIngredient.price}
        thumbnail={agregateIngredient.image}
        handleClose={() => dispatch(removeIngredientItem(agregateIngredient.uuid))}
      />
    </div>
  )
}
