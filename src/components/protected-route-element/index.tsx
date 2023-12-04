
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

import { getUserData } from '../../services/actions/auth'
import { APP_PATH } from '../../shared/common'

import { useAppDispatch, useAppSelector } from '../../hooks/useStore'

type TProps = {
  element: ReactNode,
  notAuth?: boolean,
}

export const ProtectedRouteElement: FC<TProps> = ({ element, notAuth = false }) => {
  const dispath = useAppDispatch()

  const hasAuth = useAppSelector((store) => store.auth.name && store.auth.email)
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    if (!hasAuth) {
      await dispath(getUserData())
    }
    
    setUserLoaded(true)
  }

  useEffect(() => {
    init()
  }, [])

  if (!isUserLoaded) {
    return null
  }

   if (notAuth) {
    return hasAuth ? <Navigate to={APP_PATH.MAIN} replace/> : (<>{element}</>)
  }
  
  return hasAuth ? (<>{element}</>) : <Navigate to={APP_PATH.LOGIN} replace/>
}
