import { useState, useEffect, useMemo, ChangeEvent } from 'react'
import type { FC } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { setUserData } from '../../../services/actions/auth'
import type { TUserDataBase } from '../../../types/api'
import type { TInitialStateAuth } from '../../../services/initialState'

import cls from './style.module.css'

import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'

export const ProfileEdit: FC = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector((store) => store.auth)

  const [defaultUserData, setDefaultUserData] = useState<TUserDataBase>({
    email: '',
    name: '',
    password: '',
  })

  const [form, setForm] = useState<TUserDataBase>({...defaultUserData})
  const [loading, setLoading] = useState<boolean>(false)

  const hasReset = useMemo<boolean>(() => {
    return JSON.stringify(defaultUserData) !== JSON.stringify(form)
  }, [defaultUserData, form])


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setForm({
      ...form,
      [target.name]: target.value
    })
  }

  function setFormFromUserData(newUserData: TInitialStateAuth = userData) {
    setDefaultUserData({
      ...newUserData,
      password: '',
    })

    setForm({
      ...newUserData,
      password: '',
    })
  }

  async function updateUserData() {
    setLoading(true)
    await dispatch(setUserData(form))
    setLoading(false)
  }

  useEffect(() => {
    setFormFromUserData(userData)
  }, [userData])

  return (
    <form className={cls.form}>
      <Input
        type="text"
        placeholder="Имя"
        icon="EditIcon"
        value={form.name}
        name="name"
        size="default"
        required
        onChange={handleChange}
      />

      <Input
        type="email"
        placeholder="Логин"
        icon="EditIcon"
        value={form.email}
        name="email"
        size="default"
        required
        onChange={handleChange}
      />

      <Input
        placeholder="Пароль"
        size="default"
        name="password"
        icon="EditIcon"
        type="password"
        value={form.password}
        required
        onChange={handleChange}
      />

      {hasReset &&
        (
          <div style={{textAlign: 'center'}}>
            <Button
              type="secondary"
              size="small"
              disabled={loading}
              htmlType="button"
              onClick={() => setFormFromUserData(userData)}
            >
              <p className="text text_type_main-default">
                Отмена
              </p>
            </Button>

            <Button
              type="primary"
              size="small"
              htmlType="button"
              disabled={loading}
              onClick={() => updateUserData()}
            >
              <p className="text text_type_main-default">
                Сохранить
              </p>
            </Button>
          </div>
        )
      }
    </form>
  )
}
