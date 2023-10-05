import PropTypes from "prop-types"
import { useEffect } from "react"
import { createPortal } from "react-dom"

import { ModalHeader } from "./modal-header"
import { ModalOverlay } from "./modal-overlay"

import cls from "./style.module.css"

const modalCcontaner = document.getElementById("modal-contaner")
const bodyTag = document.querySelector("body")

export const Modal = ({ onClose, titlle, children }) => {
  useEffect(() => {
    document.addEventListener("keyup", escHandler)
    bodyTag.setAttribute("style", "overflow: hidden")

    return () => {
      document.removeEventListener("keyup", escHandler)
      bodyTag.removeAttribute("style")
    }
  }, [])

  function escHandler(event) {
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

Modal.defaultProps = {
  titlle: "",
  onClose: () => {},
}

Modal.propTypes = {
  titlle: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
}
