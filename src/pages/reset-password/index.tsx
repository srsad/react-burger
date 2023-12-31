import type { FC, FormEvent } from "react"
import { Link, useNavigate, type NavigateFunction } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import { passwordReset } from "../../services/actions/auth"
import { APP_PATH } from "../../shared/common"
import { useForm } from "../../hooks/useForm"

import type { TPasswordResetReques } from "../../types/api"

import { useAppDispatch, useAppSelector } from '../../hooks/useStore'

export const ResetPassword: FC = () => {
  const dispatch = useAppDispatch()
  const navigate: NavigateFunction = useNavigate()

  const hasError = useAppSelector((state) => !!state.errors.errorMessage)

  const { values: form, handleChange } = useForm<TPasswordResetReques>({
    password: '',
    token: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(passwordReset(form))

    if (!hasError) {
      navigate(APP_PATH.LOGIN)
    }
  }

  return (
    <div className="non-auth-wrapper">
      <form className="non-auth-wrapper__form" onSubmit={handleSubmit}>
        <h3 className="text text_type_main-medium">Восстановление пароля</h3>
        <PasswordInput
          placeholder="Введите новый пароль"
          size="default"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Введите код из письма"
          name="token"
          value={form.token}
          onChange={handleChange}
        />

        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
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
