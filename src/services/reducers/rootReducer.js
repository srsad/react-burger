import auth from './authSlice'
import errors from './errorSlice'
import ingredients from './ingredientsSlice'
import order from './orderSlice'

export default function reducers() {
  return {
    auth,
    errors,
    ingredients,
    order,
  }
}
