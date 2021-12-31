/**
 * @file Shows some stats after the game has finished
 */

import styles from './result.module.scss'
import useStore from '../store/store'

import buildings from '../assets/buildings'

const MIN_BUILDING_TRESHOLD = 15
const roundToTwoDecimals = (value) => Math.round(value * 100) / 100

const ResultView = () => {
	const { score, endResult } = useStore((state) => ({
		score: state.score,
		endResult: state.endResult
	}))

	const hideStats = score < MIN_BUILDING_TRESHOLD

	return endResult ? (
		<div className={styles.container}>
			<h2>Your result</h2>
			<div className={styles['result-container']}>
				{hideStats && <Hint />}
				<div className={styles['result-row']}>
					<Item
						value={endResult[0].value}
						type={endResult[0].type}
						disabled={hideStats}
					/>
					<Item
						value={hideStats ? 0 : endResult[1].value}
						type={endResult[1].type}
						disabled={hideStats}
					/>
					<Item
						value={hideStats ? 0 : endResult[2].value}
						type={endResult[2].type}
						disabled={hideStats}
					/>
				</div>

				<div className={styles['result-row']}>
					<FastestSlowestBuilding
						value={endResult[3]?.value}
						type={endResult[3]?.type}
						disabled={hideStats}
					/>
					<FastestSlowestBuilding
						value={endResult[4]?.value}
						type={endResult[4]?.type}
						disabled={hideStats}
					/>
				</div>
			</div>
		</div>
	) : (
		<div style={{ padding: '4rem 0' }}>Couldn't fetch end result.</div>
	)
}

const Item = ({ value, type, disabled }) => {
	return (
		<div className={`${styles.item} ${disabled ? styles.disabled : null}`}>
			<h2>
				{roundToTwoDecimals(value)}
				{type === 'accuracy' && <span className={styles.unit}>%</span>}
			</h2>
			<span>{type}</span>
		</div>
	)
}

const FastestSlowestBuilding = ({ value, type, disabled }) => {
	const keyMap = useStore((state) => state.keyMap)
	const _building = value
		? buildings.find((el) => value[0] === el.name)
		: undefined

	const _value = value ? value[1].toFixed(2) : 0

	// Each shortcut is stored as a coordinate for an 2d array, ex. 0:0
	const firstKeyIndex = _building ? _building.shortcut[0].split(':') : null
	const secondKeyIndex = _building ? _building.shortcut[1].split(':') : null

	const firstKey = firstKeyIndex
		? keyMap[firstKeyIndex[0]][firstKeyIndex[1]]
		: null
	const secondKey = secondKeyIndex
		? keyMap[secondKeyIndex[0]][secondKeyIndex[1]]
		: null

	return (
		<div
			className={`${styles.item} ${styles['fastest-slowest-building']} ${
				disabled ? styles.disabled : null
			}`}>
			<div className={styles.icon}>
				{_building && (
					<>
						<img
							src={_building.icon}
							alt={`${_building.name} icon`}
						/>
						<div className={styles.keys}>
							<span>{firstKey}</span>
							<span>{secondKey}</span>
						</div>
					</>
				)}
			</div>
			<div className={styles.stats}>
				<h2>
					{_value}
					<span className={styles.unit}>sec/avg.</span>
					{type === 'accuracy' && '%'}
				</h2>
				<span>{type}</span>
			</div>
		</div>
	)
}

const Hint = () => {
	return (
		<div className={`${styles.item} ${styles.hint}`}>
			Stats require at least {MIN_BUILDING_TRESHOLD} played buildings.
		</div>
	)
}

export default ResultView
