import ingredients from './ingredientsSlice'
import order from './orderSlice'
import errors from './errorSlice'

export default function reducers() {
  return {
    ingredients,
    order,
    errors,
  }
}
