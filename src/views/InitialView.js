import styles from './initial.module.scss'

const InitialView = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logo} />
			<h2>
				XYZ is a small game to learn or practice AoE building shortcuts.
			</h2>
		</div>
	)
}

export default InitialView
