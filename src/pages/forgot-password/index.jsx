import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'

import { resetPassword } from "../../services/actions/auth"
import { APP_PATH } from '../../shared/common'

export const ForgotPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hasError = useSelector(state => !!state.errors.errorMessage)

  const [form, setForm] = useState({
    email: '',
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
      navigate(APP_PATH.RESET_PASSWORD)
    }
  }

  return (
    <div className="non-auth-wrapper">
      <form className="non-auth-wrapper__form" onSubmit={handleSubmit}>
        <h3 className="text text_type_main-medium">Регистрация</h3>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Button type="primary" size="medium">
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
