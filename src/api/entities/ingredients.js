export default function ingredients(api) {
  return {
    getIngredients() {
      return api('/api/ingredients')
    }
  }
}
