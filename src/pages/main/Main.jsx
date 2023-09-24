import { AppHeader } from '../../components/app-header'
import { BurgerIngredients } from '../../components/burger-ingredients'
import { BurgerConstructor } from '../../components/burger-constructor'

import { burgersMock } from '../../utils/data'
import mainStyles from './style.module.css'

const Main = () => {
  return (
    <div className={mainStyles.main}>
      <AppHeader />

      <section className={mainStyles.content}>
        <h1 className="pt-10 pb-5 text text_type_main-large">
          Соберите бургер
        </h1>

        <section className={mainStyles.constructor}>
          <BurgerIngredients ingredientsList={burgersMock} />

          <BurgerConstructor ingredientsList={burgersMock} />
        </section>
      </section>
    </div>
  );
}

export default Main