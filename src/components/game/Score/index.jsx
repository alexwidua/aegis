import styles from './score.module.scss'

const Score = ({ score, scoreLimit }) => {
	return (
		<span
			className={styles.score}
			dangerouslySetInnerHTML={{ __html: `${score} / ${scoreLimit}` }}
		/>
	)
}

export default Score
