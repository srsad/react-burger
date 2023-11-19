import type { FC, FormEvent } from "react"
import { Link, useNavigate, type NavigateFunction } from "react-router-dom"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDispatch, useSelector } from "react-redux"

import { resetPassword } from "../../services/actions/auth"
import { APP_PATH } from '../../shared/common'
import { useForm } from '../../hooks/useForm'

export const ForgotPassword: FC = () => {
  const dispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()

  const hasError = useSelector((state: any) => !!state.errors.errorMessage)

  const { values: form, handleChange } = useForm({
    email: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // @ts-ignore
    dispatch(resetPassword(form))

    if (!hasError) {
      navigate(APP_PATH.RESET_PASSWORD)
    }
  }

  return (
    <div className="non-auth-wrapper">
      {form.email}
      <form className="non-auth-wrapper__form" onSubmit={handleSubmit}>
        <h3 className="text text_type_main-medium">Регистрация</h3>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Button type="primary" size="medium" htmlType="submit">
          Восстановить
        </Button>
      </form>
      <div className="non-auth-wrapper__description">
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link to={APP_PATH.LOGIN} className="non-auth-wrapper__link pl-2">Войти</Link>
        </p>
      </div>
    </div>
  )
}
