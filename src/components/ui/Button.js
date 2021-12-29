import styles from './button.module.scss'

const Button = ({ primary, flat, children, ...rest }) => {
	return (
		<button
			className={`${styles.button} ${primary ? styles.primary : null} ${
				flat ? styles.flat : null
			}`}
			{...rest}>
			{children}
		</button>
	)
}

export default Button
