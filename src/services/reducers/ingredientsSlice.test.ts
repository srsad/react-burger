import crypto from 'crypto'

import { initialStateIngredients as initialState, type TInitialStateIngredients } from '../initialState'
import reducer, {
  cleanIngredientBun,
  cleanIngredientDetatl,
  cleanIngredientItems,
  moveIngredientItem,
  removeIngredientItem,
  setIngredientBun,
  setIngredientDetatl,
  setIngredientItem,
  setIngredientsList,
  setLoading,
} from './ingredientsSlice'

import { MOCK_INGREDIENTS } from '../../shared/mock'

const mockState: TInitialStateIngredients = {
  ...initialState,
  ingredientsList: [...MOCK_INGREDIENTS.data]
}

describe('Reducer ingredients', () => {

  test('Should be in its initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ ...initialState })
  })

  test('Should fill up the ingredient list - setIngredientsList', () => {
    const action = {
      type: setIngredientsList,
      payload: MOCK_INGREDIENTS.data
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsList: [...MOCK_INGREDIENTS.data],
    })
  })

  test('Should be a change in the loading status of the ingredients - setLoading', () => {
    const action = {
      type: setLoading,
      payload: false
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
    })
  })

  test('should be an ingredient selection - setIngredientItem', () => {
    const payload = {
      ...MOCK_INGREDIENTS.data[1],
      uuid: crypto.randomUUID(),
    }
    const action = {
      type: setIngredientItem,
      payload,
    }

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      burgerConstructor: {
        bun: null,
        items: [payload],
      }
    })
  })

  test('Should be selected ingredients must be re-sorted - moveIngredientItem', () => {
    const burgerConstructorItems = [
      {
        ...MOCK_INGREDIENTS.data[1],
        uuid: crypto.randomUUID(),
      },
      {
        ...MOCK_INGREDIENTS.data[2],
        uuid: crypto.randomUUID(),
      },
    ]

    const mockStateWithIngredientsItems = {
      ...mockState,
      burgerConstructor: {
        bun: null,
        items: [...burgerConstructorItems],
      }
    }

    const action = {
      type: moveIngredientItem,
      payload: { oldIndex: 0, newIndex: 1 },
    }

    expect(reducer(mockStateWithIngredientsItems, action)).toEqual({
      ...mockStateWithIngredientsItems,
      burgerConstructor: {
        bun: null,
        items: [...burgerConstructorItems.reverse()],
      }
    })
  })


  test('should be removed selected ingredient - removeIngredientItem', () => {
    const uuid = crypto.randomUUID()

    const mockStateWithIngredientsItems = {
      ...mockState,
      burgerConstructor: {
        bun: null,
        items: [{ ...MOCK_INGREDIENTS.data[1], uuid }],
      }
    }

    const action = {
      type: removeIngredientItem,
      payload: uuid,
    }

    expect(reducer(mockStateWithIngredientsItems, action)).toEqual({ ...mockState })
  })

  test('Should be cleared list of selected ingredients   - cleanIngredientItems', () => {
    const mockStateWithIngredientsItems = {
      ...mockState,
      burgerConstructor: {
        bun: null,
        items: [{
          ...MOCK_INGREDIENTS.data[1],
          uuid: crypto.randomUUID(),
        }],
      }
    }

    const action = {
      type: cleanIngredientItems
    }

    expect(reducer(mockStateWithIngredientsItems, action)).toEqual({ ...mockState })
  })

  test('Should be a bun selection must take place  - setIngredientBun', () => {
    const action = {
      type: setIngredientBun,
      payload: { ...MOCK_INGREDIENTS.data[0] },
    }

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      burgerConstructor: {
        bun: MOCK_INGREDIENTS.data[0],
        items: [],
      }
    })
  })

  test('Should be a cleansing of the bun - cleanIngredientBun', () => {
    const action = {
      type: cleanIngredientBun
    }

    expect(reducer(mockState, action)).toEqual({ ...mockState })
  })

  test('Should be set data for the ingredient part - setIngredientDetatl', () => {
    const action = {
      type: setIngredientDetatl,
      payload: MOCK_INGREDIENTS.data[0],
    }

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      ingredientDetatl: MOCK_INGREDIENTS.data[0]
    })
  })

  test('Should delete the data from the ingredient detailer - cleanIngredientDetatl', () => {
    const action = {
      type: cleanIngredientDetatl,
    }

    expect(reducer(mockState, action)).toEqual({ ...mockState })
  })
})
