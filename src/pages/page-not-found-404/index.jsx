import { Link } from 'react-router-dom'

import cls from './style.module.css'
import { APP_PATH } from '../../shared/common'

export const PageNotFound404 = () => {
  return (
    <div className={cls.wrapper}>
      <h1 className="text text_type_main-medium">Страница не найдена =(</h1>
      <Link to={APP_PATH.MAIN} className='text text_type_main-medium mt-6'>На главную</Link>
    </div>
  )
}
