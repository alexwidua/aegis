import styles from './index.module.scss'

const Button = ({ primary, tertiary, children, ...rest }) => {
	return (
		<button
			className={`${styles.button} ${primary ? styles.primary : null} ${
				tertiary ? styles.tertiary : null
			}`}
			{...rest}>
			{children}
		</button>
	)
}

export default Button
