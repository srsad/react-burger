import { useEffect, useState } from "react"
import { Routes, Route, useLocation, useNavigate, Location, type NavigateFunction } from 'react-router-dom'

import { AppHeader } from "../components/app-header"
import { ErrorNotificationDetails } from "../components/error-notification-details"
import { IngredientDetails } from "../components/burger-ingredient-details"
import { ProtectedRouteElement } from "../components/protected-route-element"
import { Modal } from "../components/ui/modal"
import { ProfileLayout } from "../layouts/profile"

import { setIngredientDetatl } from '../services/reducers/ingredientsSlice'
import { cleanDetailOrder } from '../services/reducers/orderSlice'

import {
  Main,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  Feed,
  DetailOrder,
  PageNotFound404,
} from "../pages"

import cls from "./style.module.css"

import { fetchIngredientsList } from '../services/actions/ingredients'
import { getUserData } from '../services/actions/auth'
import { cleanError } from '../services/reducers/errorSlice'

import { useAppDispatch, useAppSelector } from '../hooks/useStore'

import { APP_PATH } from '../shared/common'

export default function App() {
  const dispatch = useAppDispatch()
  let location = useLocation()
  const navigate: NavigateFunction = useNavigate()

  const state = location.state as { backgroundLocation?: Location }

  const errorNotification = useAppSelector((state) => state.errors.errorMessage)
  const hasAuth = useAppSelector((store) => store.auth.name && store.auth.email)

  const [appLoaded, setAppLoaded] = useState<boolean>(false)

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

  function closeDetailOrder(path: string) {
    dispatch(cleanDetailOrder())
    navigate(path)
  }

  return (
    <div className={cls.main}>
      {!!errorNotification && (
        <ErrorNotificationDetails
          errorText={errorNotification as string}
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
            <Route path={APP_PATH.ORDERS} element={<ProfileOrders />} />
          </Route>

          <Route path={APP_PATH.ORDER} element={
            <ProtectedRouteElement element={<DetailOrder />} />
          } />

          <Route path={APP_PATH.FEED} element={<Feed />} />
          <Route path={APP_PATH.FEED_ID} element={<DetailOrder />} />

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

          <Route path={APP_PATH.FEED_ID} element={(
            <Modal onClose={() => closeDetailOrder(APP_PATH.FEED)} titlle="">
              <DetailOrder fullPage={false} />
            </Modal>
          )} />

          <Route path={APP_PATH.ORDER} element={(
            <Modal onClose={() => closeDetailOrder(APP_PATH.ORDERS)} titlle="">
              <DetailOrder fullPage={false} />
            </Modal>
          )} />
        </Routes>
      )}
    </div>
  )
}
