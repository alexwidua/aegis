import { roundToTwoDecimals } from '@utils/math'
import styles from './index.module.scss'

const Table = ({ children }) => {
	return <div className={styles.container}>{children}</div>
}

const TableRow = ({ children }) => {
	return <div className={styles.row}>{children}</div>
}

const TableItem = ({
	value,
	label,
	unit = null,
	stretch = false,
	disabled = false,
	showBuilding = false
}) => {
	const _value = roundToTwoDecimals(value)

	return (
		<div
			className={`
			${styles.item} 
			${showBuilding ? styles.building : null} 
			${disabled ? styles.disabled : null}`}>
			{/* Conditionally show building icon, used rn to show fastest and slowest building stats */}
			<div className={styles.icon}>
				{showBuilding && (
					<>
						<img
							src={showBuilding.icon}
							alt={`${showBuilding.name} icon`}
						/>
						<div className={styles.keys}>
							<span>{showBuilding.shortcuts[0]}</span>
							<span>{showBuilding.shortcuts[1]}</span>
						</div>
					</>
				)}
			</div>
			<div>
				<h2>
					{_value}
					{unit && <span className={styles.unit}>{unit}</span>}
				</h2>
				<span>{label}</span>
			</div>
		</div>
	)
}

export { Table, TableRow, TableItem }

// const FastestSlowestBuilding = ({ value, type, disabled }) => {
// 	const keyboardMap = useStore((state) => state.keyboardMap)
// 	const _building = value
// 		? buildings.find((el) => value[0] === el.name)
// 		: undefined
// 	const _value = value ? value[1].toFixed(2) : 0

// 	// Since each building just contains the shortcut as 2d coordinate,
// 	// we need to get it by looking up the current picked keyboard layout.
// 	const firstKeyIndex = _building ? _building.shortcut[0].split(':') : null
// 	const secondKeyIndex = _building ? _building.shortcut[1].split(':') : null
// 	const firstKey = firstKeyIndex
// 		? keyboardMap[firstKeyIndex[0]][firstKeyIndex[1]]
// 		: null
// 	const secondKey = secondKeyIndex
// 		? keyboardMap[secondKeyIndex[0]][secondKeyIndex[1]]
// 		: null

// 	return (
// 		<div
// 			className={`${styles.item} ${styles['fastest-slowest-building']} ${
// 				disabled ? styles.disabled : null
// 			}`}>
// 			<div className={styles.icon}>
// 				{_building && (
// 					<>
// 						<img
// 							src={_building.icon}
// 							alt={`${_building.name} icon`}
// 						/>
// 						<div className={styles.keys}>
// 							<span>{firstKey}</span>
// 							<span>{secondKey}</span>
// 						</div>
// 					</>
// 				)}
// 			</div>
// 			<div className={styles.stats}>
// 				<h2>
// 					{_value}
// 					<span className={styles.unit}>sec/avg.</span>
// 				</h2>
// 				<span>{type}</span>
// 			</div>
// 		</div>
// 	)
// }
