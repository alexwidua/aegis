import styles from './hint.module.scss'
import { MIN_BUILDING_TRESHOLD } from '.'

const Hint = () => {
	return (
		<div className={`${styles.item} ${styles.hint}`}>
			Stats require at least {MIN_BUILDING_TRESHOLD} played buildings.
		</div>
	)
}

export default Hint
