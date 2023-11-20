// типизируй весь файл
import { API_HOST } from "../config"
import { $api } from "./index"
import { TErrorResponse } from "../types/api"

/**
 * Проверка ответа от сервера
 */
function checkReponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() : res.json().then((err: TErrorResponse) => Promise.reject(err))
}

export default async function fetchInstance<T>(url: RequestInfo, options: any = {}): Promise<T> {
  const endpoint = API_HOST + url

  try {
    const res = await fetch(endpoint, options ?? {})

    return await checkReponse<T>(res)

  } catch (err) {
    if ((err as { message: string }).message === "jwt expired") {
      const refreshData = await $api.auth.refreshToken()

      if (!refreshData.success) {
        Promise.reject(refreshData)
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken)
      localStorage.setItem("accessToken", refreshData.accessToken)

      if (options.headers) {
        options.headers = {
          ...options.headers,
          authorization: refreshData.accessToken
        }
      }

      const res = await fetch(endpoint, options ?? {})

      return await checkReponse<T>(res)
    } else {
      return Promise.reject(err)
    }
  }
}
