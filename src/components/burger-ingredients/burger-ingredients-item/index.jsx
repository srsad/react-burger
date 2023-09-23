import PropTypes from 'prop-types'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import componentClasses from './style.module.css';

import { ingredientShape } from '../../../types/common';

export const BurgerIngredientsItem = ({ingredient, count}) => {
  return (
    <div className={`${componentClasses.item} mt-6`}>
      <section className={componentClasses.image}>
        <img src={ingredient.image} alt={ingredient.name}/>
      </section>

      <section className={componentClasses.price}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </section>

      <p className={`${componentClasses.name} text text_type_main-default`}>
        {ingredient.name}
      </p>

      {!!count &&
        <section className={componentClasses.count}>
          <Counter count={count} size="default"/>
        </section>
      }
    </div>
  );
};

BurgerIngredientsItem.propTypes = {
  count: PropTypes.number.isRequired,
  ingredient: ingredientShape.isRequired
}