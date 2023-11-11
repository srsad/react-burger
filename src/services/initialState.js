export const initialStateIngredients = {
  loading: true,
  // список всех полученных ингредиентов
  ingredientsList: [],
  // список всех ингредиентов в текущем конструкторе бургера
  burgerConstructor: {
    bun: null,
    items: []
  },
  // объект текущего просматриваемого ингредиента
  ingredientDetatl: null,
}

export const initialStateOrder = {
  name: '',
  order: {
    number: '',
  },
  success: true,
}

export const initialStateError = {
  // сообщение об ошибке
  errorMessage: '',
}

export const initialStateAuth = {
  name: '',
  email: '',
} 
