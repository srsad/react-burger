import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { resetPassword } from "../../services/actions/auth"
import { APP_PATH } from '../../shared/common'

export const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hasError = useSelector(state => !!state.errors.errorMessage)

  const [form, setForm] = useState({
    password: '',
    code: '',
  })

  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword(form))

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
          name="code"
          value={form.code}
          onChange={handleChange}
        />

        <Button type="primary" size="medium">
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
