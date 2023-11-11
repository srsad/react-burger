import { Outlet } from 'react-router-dom'
import { ProfileSidebar } from '../components/profile/profile-sidebar'

import cls from './style.module.css'

export const ProfileLayout = () => {
  return (
    <div className={cls.wrapper}>
      <ProfileSidebar />

      <Outlet />
    </div>
  )
}
