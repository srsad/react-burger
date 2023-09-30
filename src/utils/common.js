/**
 * Шикарная проверка ответа от сервера
 */
export function checkReponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}
