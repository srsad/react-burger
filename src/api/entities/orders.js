export default function orders(api) {
  return {
    createOrder(ingredientsList) {
      return api("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ ingredients: ingredientsList }),
      })
    },
  }
}
