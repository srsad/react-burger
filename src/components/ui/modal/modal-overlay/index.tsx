import { FC } from "react"
import cls from "./style.module.css"

interface IModalOverlayProps {
  onClose: () => void
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClose = () => {} }) => {
  return <div className={cls.modalOverlay} onClick={onClose} />
}
