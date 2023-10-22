export const setError = (state, action) => {
  state.errorMessage = action.payload
}

export const cleanError = (state) => {
  state.errorMessage = ''
}
