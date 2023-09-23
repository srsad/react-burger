import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { TABS_TYPES } from '../../../shared/common'

import componentClasses from './style.module.css'

import { ingredientShape } from '../../../types/common'

export const BurgerConstructorList = ({ ingredientsList }) => {
  // только булочки
  const buns = ingredientsList.find(el => el.type === TABS_TYPES.BUN)
  // все остольное
  const otherTopings = ingredientsList.filter(el => el.type !== TABS_TYPES.BUN)

  const otherTopingsList = otherTopings.map((el) => (
    <div
      className={componentClasses.element}
      key={el._id}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
      />
    </div>
  ))

  return (
    <div className="">
      <div className={componentClasses.wrapper}>
        {buns && (
          <ConstructorElement
            extraClass={componentClasses.elementStatic}
            type="top"
            isLocked={true}
            text={buns.name}
            price={buns.proice}
            thumbnail={buns.image}
          />
        )}

        <section className={`${componentClasses.list} custom-scroll`}>
          {otherTopings.length && (otherTopingsList)}
        </section>

        {buns && (
          <ConstructorElement
            extraClass={componentClasses.elementStatic}
            type="bottom"
            isLocked={true}
            text={buns.name}
            price={buns.proice}
            thumbnail={buns.image}
          />
        )}
      </div>
    </div>
  )
}

BurgerConstructorList.defaultProps = {
  ingredientsList: []
}

BurgerConstructorList.propTypes = {
  // TODO: разобраться, тут arrayOf илипросто array
  ingredientsList: PropTypes.arrayOf(ingredientShape).isRequired
}
