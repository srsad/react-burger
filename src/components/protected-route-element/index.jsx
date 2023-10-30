
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getUserData } from '../../services/actions/auth'
import { APP_PATH } from '../../shared/common'

export const ProtectedRouteElement = ({ element, notAuth = false }) => {
  const dispath = useDispatch()
  const hasAuth = useSelector((store) => store.auth.name && store.auth.email)
  const [isUserLoaded, setUserLoaded] = useState(false);

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
    return hasAuth ? <Navigate to={APP_PATH.MAIN} replace/> : element
  }
  
  return hasAuth ? element : <Navigate to={APP_PATH.LOGIN} replace/>
}
