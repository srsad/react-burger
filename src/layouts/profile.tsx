import type { FC } from "react"
import { Outlet } from "react-router-dom"
import { ProfileSidebar } from "../components/profile/profile-sidebar"

import cls from "./style.module.css"

export const ProfileLayout: FC = () => {
  return (
    <div className={cls.wrapper}>
      <ProfileSidebar />

      <Outlet />
    </div>
  )
}
