import { API_HOST } from "../config"
import { $api } from "./index"

/**
 * Проверка ответа от сервера
 */
function checkReponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export default async function fetchInstance(url, options) {
  const endpoint = API_HOST + url

  try {
    const res = await fetch(endpoint, options)

    return await checkReponse(res)
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await $api.auth.refreshToken()

      if (!refreshData.success) {
        Promise.reject(refreshData)
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken)
      localStorage.setItem("accessToken", refreshData.accessToken)

      options.headers.authorization = refreshData.accessToken

      const res = await fetch(endpoint, options)

      return await checkReponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}
