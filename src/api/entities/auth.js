export default function ingredients(api) {
  return {
    /**
     * Авторизация
     */
    login(body) {
      return api("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      })
    },

    /**
     * Регистрация
     */
    register(body) {
      return api("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      })
    },

    /**
     * Выход из системы
     */
    logout() {
      return api("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      })
    },

    /**
     * Восстановление пароля
     */
    forgotPassword(body) {
      return api("/api/password-reset/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      })
    },

    /**
     * Cброс пароля
     */
    resetPassword(body) {
      return api("/api/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      })
    },

    /**
     * Обновление токена
     */
    refreshToken() {
      return api("/api/auth/token", {
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
      return api("/api/auth/user", {
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
    updateUserData(body) {
      return api("/api/auth/user", {
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
