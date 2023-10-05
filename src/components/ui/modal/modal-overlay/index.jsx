import PropTypes from "prop-types"
import cls from "./style.module.css"

export const ModalOverlay = ({ onClose }) => {
  return <div className={cls.modalOverlay} onClick={onClose} />
}

ModalOverlay.defaultProps = {
  onClose: () => {},
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}
