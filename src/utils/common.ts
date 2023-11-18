interface ISetCookieProps {
  path?: string
  expires?: Date | number | string
}

/**
 * Функция рабоыт с куками
 */
export function setCookie(name: string, value: string, props: ISetCookieProps = {}) {
  props = {
    path: "/",
    ...props,
  }

  let exp = props.expires

  if (typeof exp == "number" && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }

  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString()
  }

  value = encodeURIComponent(value)
  let updatedCookie = name + "=" + value

  for (const propName in props) {
    updatedCookie += " " + propName
    const propValue = props[propName as keyof ISetCookieProps]
    if (!propValue) {
      updatedCookie += "=" + propValue
    }
  }

  document.cookie = updatedCookie
}