import api from "../apiController"
import {
  TLoginReques,
  TUserDataBase,
  TUserDataWithTokenResponse,
  TRefreshToken,
  TLogoutResponse,
  TPasswordResetReques,
  TPasswordResetResponse,
  TResetPasswordReques,
  TResetPasswordResponse,
  TUserDatanReques,
  TUserDatanResponse,
} from "../../types/api"

export default function ingredients() {
  return {
    /**
     * Авторизация
     */
    login(body: TLoginReques) {
      return api<TUserDataWithTokenResponse>("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      })
    },

    /**
     * Регистрация
     */
    register(body: TUserDataBase) {
      return api<TUserDataWithTokenResponse>("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      })
    },

    /**
     * Выход из системы
     */
    logout() {
      return api<TLogoutResponse>("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      })
    },

    /**
     * Восстановление пароля
     */
    passwordReset(body: TPasswordResetReques) {
      return api<TPasswordResetResponse>("/api/password-reset/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      })
    },

    /**
     * Cброс пароля
     */
    resetPassword(body: TResetPasswordReques) {
      return api<TResetPasswordResponse>("/api/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      })
    },

    /**
     * Обновление токена
     */
    refreshToken() {
      return api<TRefreshToken>("/api/auth/token", {
        method: 'POST',
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken')
        }),
      })
    },

    /**
     * Получение данных о пользователе
     */
    getUserData() {
      return api<TUserDatanResponse>("/api/auth/user", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization": localStorage.getItem('accessToken'),
        },
      })
    },

    /**
     * Обновление данных о пользователе
     */
    updateUserData(body: TUserDatanReques) {
      return api<TUserDatanResponse>("/api/auth/user", {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization": localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(body),
      })
    }
  }
}
