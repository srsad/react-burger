import PropTypes from 'prop-types'
import { useEffect } from 'react'

import { Modal } from '../ui/modal'
import cls from './style.module.css'

const TIME_TO_CLOSE = 7000

export const ErrorNotificationDetails = ({errorText, onClose}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, TIME_TO_CLOSE)

    return () => {
      clearTimeout(timer)
    }
  }, [onClose])

  return (
    <Modal onClose={onClose} titlle="Ошибка!">
      <p className={`${cls.error} text text_type_main-default`}>{errorText}</p>
    </Modal>
  )
}

ErrorNotificationDetails.defaultProps = {
  errorText: '',
  onClose: () => {},
}

ErrorNotificationDetails.propTypes = {
  errorText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}
