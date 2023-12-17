import { FC } from "react"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrop } from "react-dnd"

import { BurgerConstructorItem } from '../burger-constructor-item'
import { setIngredientItem, setIngredientBun } from '../../../services/reducers/ingredientsSlice'

import { TABS_TYPES, DND_TYPES } from "../../../shared/common"
import { TIngredientAgregate } from "../../../types/common"

import cls from "./style.module.css"

import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'

// Пустой фрагмент конструктора
type TConstructorFragmentPosition = 'emptyConstructorFragmentTop' | 'emptyConstructorFragmentBottom' | ''
type TEmptyConstructorFragmentProps = {
  text?: string,
  position?: TConstructorFragmentPosition,
}

const emptyConstructorFragment: FC<TEmptyConstructorFragmentProps> = ({
  text = 'Выберите начинку',
  position = ''
}) => {
  return (
    <div className={`${cls.emptyConstructorFragment} ${position}`}>
      <p className="text text_type_main-default text_color_inactive">{text}</p>
    </div>
  )
}

export const BurgerConstructorList = () => {
  const dispatch = useAppDispatch()

  // булочки
  const buns = useAppSelector((store) => store.ingredients.burgerConstructor.bun)
  // все остольное
  const otherTopings = useAppSelector((store) => store.ingredients.burgerConstructor.items)

  const [ , dropCntainerRef] = useDrop({
    accept: DND_TYPES.DROP_TYPES,
    drop(item: TIngredientAgregate) {
      onDropHandler(item)
    }
  })

  function onDropHandler(item: TIngredientAgregate) {
    if (item.type === TABS_TYPES.BUN) {
      dispatch(setIngredientBun(item))
      return
    }
    
    dispatch(setIngredientItem(item))
  }

  const otherTopingsList = otherTopings.map((el, index: number) => (
    <BurgerConstructorItem
      agregateIngredient={el}
      index={index}
      key={el.uuid}
    />
  ))

  return (
    <div
      className={cls.wrapper}
      data-testid="constructor"
      ref={dropCntainerRef}
    >
      {buns
        ? (
          <ConstructorElement
            extraClass={cls.elementStatic}
            type="top"
            isLocked={true}
            text={`${buns.name} (верх)`}
            price={buns.price}
            thumbnail={buns.image}
          />
        )
        : emptyConstructorFragment({ text: 'Выберите булку', position: cls.emptyConstructorFragmentTop })
      }

      <section className={`${cls.list} custom-scroll`}>
        {!!otherTopings.length ? otherTopingsList : emptyConstructorFragment({text: 'Выберите ингридиенты'})}
      </section>

      {buns
        ? (
          <ConstructorElement
            extraClass={cls.elementStatic}
            type="bottom"
            isLocked={true}
            text={`${buns.name} (низ)`}
            price={buns.price}
            thumbnail={buns.image}
          />
        )
        : emptyConstructorFragment({ text: 'Выберите булку', position: cls.emptyConstructorFragmentBottom })
      }
    </div>
  )
}
