import styles from './row.module.scss'

const Row = ({ children }) => {
	return <div className={styles.row}>{children}</div>
}

export default Row
