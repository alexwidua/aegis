import styles from './button.module.scss'

const Button = ({ primary, children, ...rest }) => {
	return (
		<button
			className={`${styles.button} ${primary ? styles.primary : null}`}
			{...rest}>
			{children}
		</button>
	)
}

export default Button
