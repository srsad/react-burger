import type { FC, FormEvent } from "react"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, type NavigateFunction } from 'react-router-dom'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { login } from "../../services/actions/auth"
import { useForm } from "../../hooks/useForm"

import { APP_PATH } from '../../shared/common'

export const Login: FC = () => {
  const dispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()

  const hasError = useSelector((state: any) => !!state.errors.errorMessage)

  const [loading, setLoading] = useState<boolean>(false)

  const defaultForm = {
    email: '',
    password: ''
  }

  const { values: form, handleChange, setValues: setForm } = useForm(defaultForm)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(false)
    // @ts-ignore
    await dispatch(login(form))
    setLoading(true)

    if (!hasError) {
      setForm(defaultForm)
      navigate(APP_PATH.MAIN)
    }
  }

  return (
    <div className="non-auth-wrapper">
      <form className="non-auth-wrapper__form" onSubmit={handleSubmit}>
        <h3 className="text text_type_main-medium">Вход</h3>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          name={"email"}
          value={form.email}
          onChange={handleChange}
        />
        <PasswordInput
          placeholder={"Пароль"}
          size={"default"}
          name={"password"}
          value={form.password}
          onChange={handleChange}
        />

        <Button
          type="primary"
          size="medium"
          disabled={loading}
          htmlType="submit"
        >
          Войти
        </Button>
      </form>

      <div className="non-auth-wrapper__description">
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?
          <Link to={APP_PATH.REGISTER} className="non-auth-wrapper__link pl-2">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link to={APP_PATH.FORGOT_PASSWORD} className="non-auth-wrapper__link pl-2">Восстановить пароль</Link>
        </p>
      </div>
    </div>
  )
}
