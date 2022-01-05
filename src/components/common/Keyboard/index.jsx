import styles from './keyboard.module.scss'

const Keyboard = ({
	keyboardLayout = [
		['q', 'w', 'e', 'r'],
		['a', 's', 'd', 'f'],
		['z', 'x', 'c', 'v']
	]
}) => {
	const isArray = Array.isArray(keyboardLayout)

	return isArray ? (
		<div className={styles.keyboard}>
			{keyboardLayout.map((el) => (
				<div className={styles.row}>
					{el.map((el) => (
						<div className={styles.key}>{el}</div>
					))}
				</div>
			))}
		</div>
	) : null
}

export default Keyboard
