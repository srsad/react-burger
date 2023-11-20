import { FC } from "react"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import cls from "./style.module.css"

interface IModalHeader {
  title?: string
  onClose: () => void
}

export const ModalHeader: FC<IModalHeader> = ({
  title = "",
  onClose = () => {},
}) => {
  return (
    <div className={cls.header}>
      <h3 className={`${cls.title} pt-4 pb-4 text text_type_main-large`}>
        {title}
      </h3>

      <button className={cls.close} onClick={onClose}>
        <CloseIcon type="primary" />
      </button>
    </div>
  )
}
