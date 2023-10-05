import { API_HOST } from "../config"

export default function fetchInstance(url, options) {
  return fetch(API_HOST + url, options)
}
