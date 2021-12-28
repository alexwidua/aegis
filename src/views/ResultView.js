import styles from './result.module.scss'
import useStore from '../store/store'

const ResultView = () => {
	const endResult = useStore((state) => state.endResult)

	const roundToTwoDecimals = (value) => Math.round(value * 100) / 100

	return (
		<div className={styles.container}>
			<h2>Result</h2>
			<div className={styles['result-row']}>
				{endResult.map((result, i) => (
					<div className={styles.item} key={i}>
						<span>{roundToTwoDecimals(result.value)}</span>
						<span>{result.type}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default ResultView
