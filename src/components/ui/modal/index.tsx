import { useEffect } from "react"
import type { PropsWithChildren, ReactNode } from "react"
import { createPortal } from "react-dom"

import { ModalHeader } from "./modal-header"
import { ModalOverlay } from "./modal-overlay"

import cls from "./style.module.css"

interface IModalProps {
  titlle?: string
  onClose: () => void
}

const modalCcontaner = document.getElementById("modal-contaner") as HTMLDivElement
const bodyTag = document.querySelector("body") as HTMLBodyElement

export const Modal = ({
  titlle = "",
  onClose = () => { },
  children,
}: PropsWithChildren<IModalProps>) => {
  useEffect(() => {
    document.addEventListener("keyup", escHandler)
    bodyTag.setAttribute("style", "overflow: hidden")

    return () => {
      document.removeEventListener("keyup", escHandler)
      bodyTag.removeAttribute("style")
    }
  }, [])

  function escHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose()
    }
  }

  const modal = (
    <>
      <ModalOverlay onClose={onClose} />
      <div className={cls.modal}>
        <ModalHeader title={titlle} onClose={onClose} />
        {children}
      </div>
    </>
  )

  return createPortal(modal, modalCcontaner)
}
