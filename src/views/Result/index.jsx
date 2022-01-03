/**
 * @file ...
 */

import useStore from '../../store'
import { roundToTwoDecimals } from '../../utils/math'
import styles from './index.module.scss'
import Hint from './Hint'
import Button from '../../components/Button'
import ButtonRow from '../../components/Button/Row'
import buildings from '../../assets/buildings'

const MIN_BUILDING_TRESHOLD = 15

const Result = () => {
	const { setOptionsModalOpen, score, endResult, handleGameStart } = useStore(
		(state) => ({
			setOptionsModalOpen: state.setOptionsModalOpen,
			score: state.score,
			endResult: state.endResult,
			handleGameStart: state.handleGameStart
		})
	)
	const notEnoughData = score < MIN_BUILDING_TRESHOLD

	return endResult ? (
		<div className={styles.container}>
			<h2 style={{ alignSelf: 'flex-start' }}>Your result</h2>
			<div className={styles.result}>
				{notEnoughData && <Hint />}
				<div className={styles.row}>
					<Item
						value={endResult[0].value}
						type={endResult[0].type}
						disabled={notEnoughData}
					/>
					<Item
						value={notEnoughData ? 0 : endResult[1].value}
						type={endResult[1].type}
						disabled={notEnoughData}
					/>
					<Item
						value={notEnoughData ? 0 : endResult[2].value}
						type={endResult[2].type}
						disabled={notEnoughData}
					/>
				</div>
				<div className={styles.row}>
					<FastestSlowestBuilding
						value={endResult[3]?.value}
						type={endResult[3]?.type}
						disabled={notEnoughData}
					/>
					<FastestSlowestBuilding
						value={endResult[4]?.value}
						type={endResult[4]?.type}
						disabled={notEnoughData}
					/>
				</div>
			</div>
			<ButtonRow>
				<Button
					onClick={handleGameStart}
					style={{ minWidth: '12rem' }}
					primary>
					{endResult ? 'Play again' : `Start typin'`}
				</Button>
				<Button
					onClick={() => setOptionsModalOpen(true)}
					style={{ position: 'relative' }}>
					Options
				</Button>
			</ButtonRow>
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

	// Since each building just contains the shortcut as 2d coordinate,
	// we need to get it by looking up the current picked keyboard layout.
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
				</h2>
				<span>{type}</span>
			</div>
		</div>
	)
}

export { Result, MIN_BUILDING_TRESHOLD }
