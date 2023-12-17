import type { FC, FormEvent } from "react"
import { useState } from "react"
import { Link, useNavigate, type NavigateFunction } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import { register } from "../../services/actions/auth"

import { APP_PATH } from "../../shared/common"
import { useForm } from "../../hooks/useForm"

import { useAppDispatch, useAppSelector } from '../../hooks/useStore'

export const Register: FC = () => {
  const dispatch = useAppDispatch()
  const navigate: NavigateFunction = useNavigate()

  const hasError = useAppSelector((state) => !!state.errors.errorMessage)

  const defaultForm = {
    name: '',
    email: '',
    password: ''
  }

  const { values: form, handleChange, setValues: setForm } = useForm(defaultForm)

  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await dispatch(register(form))
    setLoading(false)

    if (!hasError) {
      setForm(defaultForm)
      navigate(APP_PATH.MAIN)
    }
  }

  return (
    <div className="non-auth-wrapper">
      <form className="non-auth-wrapper__form" onSubmit={handleSubmit}>
        <h3 className="text text_type_main-medium">Регистрация</h3>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          value={form.name}
          required
          onChange={handleChange}
        />

        <Input
          type={"email"}
          placeholder={"E-mail"}
          name={"email"}
          value={form.email}
          required
          onChange={handleChange}
        />

        <PasswordInput
          placeholder={"Пароль"}
          size={"default"}
          name={"password"}
          value={form.password}
          required
          onChange={handleChange}
        />

        <Button
          type="primary"
          size="medium"
          disabled={loading}
          htmlType="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className="non-auth-wrapper__description">
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link to={APP_PATH.LOGIN} className="non-auth-wrapper__link pl-2">Войти</Link>
        </p>
      </div>
    </div>
  )
}
