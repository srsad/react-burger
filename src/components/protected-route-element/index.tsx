
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getUserData } from '../../services/actions/auth'
import { APP_PATH } from '../../shared/common'

type TProps = {
  element: ReactNode,
  notAuth?: boolean,
}

export const ProtectedRouteElement: FC<TProps> = ({ element, notAuth = false }) => {
  const dispath = useDispatch()

  const hasAuth = useSelector((store: any) => store.auth.name && store.auth.email)
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    if (!hasAuth) {
      // @ts-ignore
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
