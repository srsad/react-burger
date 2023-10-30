import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { AppHeader } from "../components/app-header"
import { ErrorNotificationDetails } from "../components/error-notification-details"
import { IngredientDetails } from "../components/burger-ingredient-details"
import { ProtectedRouteElement } from "../components/protected-route-element"
import { Modal } from "../components/ui/modal/"
import { ProfileLayout } from "../layouts/profile"

import { setIngredientDetatl } from '../services/reducers/ingredientsSlice'

import {
  Main,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  PageNotFound404,
} from "../pages"

import cls from "./style.module.css"

import { fetchIngredientsList } from '../services/actions/ingredients'
import { getUserData } from '../services/actions/auth'
import { cleanError } from '../services/reducers/errorSlice'

import { APP_PATH } from '../shared/common'

export default function App() {
  const dispatch = useDispatch()
  let location = useLocation()
  const navigate = useNavigate()

  const state = location.state

  const errorNotification = useSelector((state) => state.errors.errorMessage)
  const hasAuth = useSelector((store) => store.auth.name && store.auth.email)

  const [appLoaded, setAppLoaded] = useState(false)

  useEffect(() => {
    dispatch(fetchIngredientsList())

    if (!hasAuth) {
      dispatch(getUserData())
    }
  }, [dispatch, hasAuth])

  useEffect(() => {
    setAppLoaded(true)
    delete state?.backgroundLocation
  }, [])

  function closeIngredientModal() {
    dispatch(setIngredientDetatl(null))
    navigate(APP_PATH.MAIN)
  }

  return (
    <div className={cls.main}>
      {!!errorNotification && (
        <ErrorNotificationDetails
          errorText={errorNotification}
          onClose={() => dispatch(cleanError())}
        />
      )}

      <AppHeader />

      <section className={cls.content}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path={APP_PATH.MAIN} element={<Main />} />
          <Route path={APP_PATH.INGREDIENTS_ID} element={<IngredientDetails />} />
          <Route path={APP_PATH.LOGIN} element={
            <ProtectedRouteElement element={<Login />} notAuth />
          } />
          <Route path={APP_PATH.REGISTER} element={
            <ProtectedRouteElement element={<Register />} notAuth />
          } />
          <Route path={APP_PATH.FORGOT_PASSWORD} element={
            <ProtectedRouteElement element={<ForgotPassword />} notAuth />
          } />
          <Route path={APP_PATH.RESET_PASSWORD} element={
            <ProtectedRouteElement element={<ResetPassword />} notAuth />
          } />

          <Route path={APP_PATH.PROFILE} element={
            <ProtectedRouteElement element={<ProfileLayout />} />
          }>
            <Route path={APP_PATH.PROFILE} element={<Profile />} />
            <Route path={APP_PATH.ORDERS} element={<p>orders</p>} />
          </Route>

          <Route path={APP_PATH.PAGE_NOT_FOUND_404} element={<PageNotFound404 />} />
        </Routes>
      </section>
      
      {(state?.backgroundLocation && appLoaded) && (
        <Routes>
          <Route path={APP_PATH.INGREDIENTS_ID} element={(
            <Modal onClose={closeIngredientModal} titlle="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          )} />
        </Routes>
      )}
    </div>
  )
}
