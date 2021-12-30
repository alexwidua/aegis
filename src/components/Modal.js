import styles from './modal.module.scss'
import Modal from 'react-modal'

const ModalWindow = ({ isOpen, onRequestClose, children, ...rest }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className={styles['modal-content']}
			overlayClassName={styles['modal-overlay']}
			closeTimeoutMS={200}>
			<button
				className={styles['modal-btn-close']}
				onClick={onRequestClose}>
				✗
			</button>
			{children}
		</Modal>
	)
}

export default ModalWindow
