/**
 * @file Shows some stats after the game has finished
 */

import styles from './result.module.scss'
import useStore from '../store/store'

import buildings from '../assets/buildings'

const roundToTwoDecimals = (value) => Math.round(value * 100) / 100

const ResultView = () => {
	const endResult = useStore((state) => state.endResult)
	return endResult ? (
		<div className={styles.container}>
			<h2>Result</h2>
			<div className={styles['result-container']}>
				<div className={styles['result-row']}>
					<Item value={endResult[0].value} type={endResult[0].type} />
					<Item value={endResult[1].value} type={endResult[1].type} />
					<Item value={endResult[2].value} type={endResult[2].type} />
				</div>
				{endResult[3].value && (
					<div className={styles['result-row']}>
						<Building
							value={endResult[3]?.value}
							type={endResult[3]?.type}
						/>
						<Building
							value={endResult[4]?.value}
							type={endResult[4]?.type}
						/>
					</div>
				)}
			</div>
		</div>
	) : (
		<div style={{ padding: '4rem 0' }}>Couldn't fetch end result.</div>
	)
}

const Item = ({ value, type }) => {
	return (
		<div className={styles.item}>
			<h2>
				{roundToTwoDecimals(value)}
				{type === 'accuracy' && <span className={styles.unit}>%</span>}
			</h2>
			<span>{type}</span>
		</div>
	)
}

const Building = ({ value, type }) => {
	const keyboardLayout = useStore((state) => state.keyboardLayout)
	const _building = buildings.find((el) => value[0] === el.name)

	const firstKey =
		typeof _building.hotkeys[0] === 'object'
			? _building.hotkeys[0][keyboardLayout]
			: _building.hotkeys[0]
	const secondKey =
		typeof _building.hotkeys[1] === 'object'
			? _building.hotkeys[1][keyboardLayout]
			: _building.hotkeys[1]

	return (
		<div className={`${styles.item} ${styles.building}`}>
			<div className={styles.icon}>
				<img src={_building.icon} alt={`${_building.name} icon`} />
				<div className={styles.keys}>
					<span>{firstKey}</span>
					<span>{secondKey}</span>
				</div>
			</div>
			<div className={styles.stats}>
				<h2>
					{value[1].toFixed(2)}
					<span className={styles.unit}>sec/avg.</span>
					{type === 'accuracy' && '%'}
				</h2>
				<span>{type}</span>
			</div>
		</div>
	)
}

export default ResultView
