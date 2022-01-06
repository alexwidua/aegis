import styles from './message.module.scss'

const Message = ({ children, className, ...rest }) => {
	return (
		<div className={styles.message} {...rest}>
			<div className={styles.inner}> {children}</div>
		</div>
	)
}

export default Message
