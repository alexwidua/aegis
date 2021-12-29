/**
 * @file Shows some stats after the game has finished
 */

import styles from './result.module.scss'
import useStore from '../store/store'

const roundToTwoDecimals = (value) => Math.round(value * 100) / 100

const ResultView = () => {
	const endResult = useStore((state) => state.endResult)
	return endResult ? (
		<div className={styles.container}>
			<h2>Result</h2>
			<div className={styles['result-row']}>
				{endResult.map((result, i) => (
					<div className={styles.item} key={i}>
						<span>
							{roundToTwoDecimals(result.value)}
							{result.type === 'accuracy' && '%'}
						</span>
						<span>{result.type}</span>
					</div>
				))}
			</div>
		</div>
	) : (
		<div style={{ padding: '4rem 0' }}>Couldn't fetch end result.</div>
	)
}

export default ResultView
