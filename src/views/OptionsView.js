import { useState, useRef } from 'react'
import styles from './options.module.scss'
import useStore from '../store/store'

import SegmentedInput from '../components/ui/SegmentedInput'
import Checkbox from '../components/ui/Checkbox'

import useKeyPress from '../hooks/useKeyPress'
import { useOnClickOutside } from '../hooks'

import buildings from '../assets/buildings'

const OptionsView = () => {
	const {
		keyMap,
		handleSetKeyMap,
		handleSetKeyMapDefault,
		scoreLimit,
		handleSetScoreLimit,
		showKeyLabels,
		handleSetShowKey,
		buildingFilter,
		handleSetBuildingFilter
	} = useStore((state) => ({
		keyMap: state.keyMap,
		handleSetKeyMap: state.handleSetKeyMap,
		handleSetKeyMapDefault: state.handleSetKeyMapDefault,
		scoreLimit: state.scoreLimit,
		handleSetScoreLimit: state.handleSetScoreLimit,
		showKeyLabels: state.showKeyLabels,
		handleSetShowKey: state.handleSetShowKey,
		buildingFilter: state.buildingFilter,
		handleSetBuildingFilter: state.handleSetBuildingFilter
	}))

	/**
	 * Keyboard map stuff
	 */
	const keymapRef = useRef()
	const [keyRebind, setkeyRebind] = useState('')

	const [keymapOverlayAge, setKeymapOverlayAge] = useState('I')
	useOnClickOutside(keymapRef, () => setkeyRebind(''))

	useKeyPress((key) => {
		if (!keyRebind) return
		const row = keyRebind[0]
		const col = keyRebind[1]
		//if (flatKeyMap.some((el) => el === key)) return handleDuplicateKey(key) // if duplicate binding
		let isDuplicate
		keyMap.forEach((row, i) => {
			const duplicate = row.indexOf(key)
			if (duplicate > -1) {
				isDuplicate = [i, duplicate]
			}
		})
		if (isDuplicate) {
			handleSetKeyMap(isDuplicate[0], isDuplicate[1], '?')
		}
		handleSetKeyMap(row, col, key)
		setkeyRebind('')
	})

	/**
	 * TODO: Refactor and split up filter into several objects
	 */
	const handleFilter = (category, key, isCheckbox) => {
		const obj = buildingFilter
		if (isCheckbox) obj[category][key] = !obj[category][key]
		else obj[category] = key
		handleSetBuildingFilter(obj)
	}
	const filterTypes = Object.keys(buildingFilter.types).map((el, i) => (
		<Checkbox
			value={buildingFilter.types[el]}
			onChange={() => handleFilter('types', el, true)}
			key={i}>
			{el}
		</Checkbox>
	))
	const filterAges = Object.keys(buildingFilter.ages).map((el, i) => (
		<Checkbox
			value={buildingFilter.ages[el]}
			onChange={() => handleFilter('ages', el, true)}
			key={i}
			style={{ textTransform: 'uppercase' }}>
			{el}
		</Checkbox>
	))

	return (
		<div className={styles.container}>
			<div className={styles.options}>
				<h2>Options</h2>
				<h3>Buildings</h3>
				<ItemSegmentedInput
					name={`buildings`}
					label={`Number of buildings`}
					value={scoreLimit}
					onValueChange={(value) => handleSetScoreLimit(value)}
					options={[{ value: 25 }, { value: 50 }, { value: 100 }]}
					style={{ marginBottom: '1.25rem' }}
				/>
				<ItemSegmentedInput
					name={`civ`}
					label={`Civilization`}
					value={buildingFilter.group}
					onValueChange={(value) => handleFilter('group', value)}
					options={[
						{
							children:
								'<img src="/flags/generic.png" alt="Flag"/>',
							value: 'GENERIC'
						},
						{
							children:
								'<img src="/flags/mongol.png" alt="Flag"/>',
							value: 'MONGOL'
						},
						{
							children: '<img src="/flags/rus.png" alt="Flag"/>',
							value: 'RUS'
						},
						{
							children:
								'<img src="/flags/chinese.png" alt="Flag"/>',
							value: 'CHINESE'
						},
						{
							children:
								'<img src="/flags/delhi.png" alt="Flag"/>',
							value: 'DELHI'
						},
						{
							children:
								'<img src="/flags/abbasid.png" alt="Flag"/>',
							value: 'ABBASID'
						}
					]}
					style={{ marginBottom: '1.25rem' }}
				/>
				<ItemCheckbox
					label={`Building ages`}
					style={{ marginBottom: '1.25rem' }}>
					{filterAges}
				</ItemCheckbox>
				<ItemCheckbox label={`Building types`}>
					{filterTypes}
				</ItemCheckbox>
				<h3>Display</h3>
				<ItemSegmentedInput
					name={`showLabels`}
					label={`Key labels`}
					value={showKeyLabels}
					onValueChange={(value) => handleSetShowKey(value)}
					options={[
						{ children: 'Show', value: 'SHOW' },
						{ children: 'Fade in after 1s', value: 'FADE_IN' },
						{ children: 'Hide', value: 'HIDE' }
					]}
				/>
			</div>
			<div className={styles['keyboard-options']}>
				<h2>Keyboard profile</h2>
				<div className={styles['keyboard-options-container']}>
					<ItemSegmentedInput
						name={`keymapOverlay`}
						label={`Overlay age`}
						value={keymapOverlayAge}
						onValueChange={(value) => setKeymapOverlayAge(value)}
						options={[
							{ value: 'I' },
							{ value: 'II' },
							{ value: 'III' },
							{ value: 'IV' }
						]}
					/>
					<div className={styles.grid} ref={keymapRef}>
						{keyMap.map((el, row) => {
							return (
								<div className={styles.row} key={row}>
									{el.map((el, col) => {
										const _age = keymapOverlayAge
										const isAgeKey =
											(row === 0 &&
												col === 0 &&
												_age === 'I') ||
											(row === 0 &&
												col === 1 &&
												_age === 'II') ||
											(row === 0 &&
												col === 2 &&
												_age === 'III') ||
											(row === 0 &&
												col === 3 &&
												_age === 'IV')
										// aight, this one is super whacky
										// TODO: Refactor!
										const building = buildings.find(
											(el) =>
												el.shortcut[1][0] ===
													row.toFixed() &&
												el.shortcut[1][2] ===
													col.toFixed() &&
												(el.group ===
													buildingFilter.group ||
													el.group === 'COMMON') &&
												el.age === keymapOverlayAge
										)

										return (
											<button
												onClick={() =>
													setkeyRebind([row, col])
												}
												className={`
												${styles.key} 
												${row === keyRebind[0] && col === keyRebind[1] ? styles.rebind : null}
												${el === '?' ? styles.missing : null}
												${isAgeKey ? styles.age : null}						
										`}
												key={col}>
												<span>{el}</span>
												{building && (
													<div
														className={`
														${styles.icon} 
														${
															buildingFilter
																?.ages[
																building?.age
															] &&
															buildingFilter
																?.types[
																building?.type
															]
																? styles.enabled
																: null
														}`}>
														<img
															src={building.icon}
															alt={building.name}
														/>
													</div>
												)}
											</button>
										)
									})}
								</div>
							)
						})}
					</div>
					<div className={styles.presets}>
						<p>Reset to default profile</p>
						<div className={styles['presets-row']}>
							<button
								onClick={() =>
									handleSetKeyMapDefault('QWERTY')
								}>
								QWERTY
							</button>
							<button
								onClick={() =>
									handleSetKeyMapDefault('QWERTZ')
								}>
								QWERTZ
							</button>
							<button
								onClick={() =>
									handleSetKeyMapDefault('AZERTY')
								}>
								AZERTY
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const ItemSegmentedInput = ({
	name,
	label,
	value,
	onValueChange,
	options,
	...rest
}) => {
	return (
		<div className={styles.item} {...rest}>
			<div className={styles.label}>{label}</div>
			<SegmentedInput
				name={name}
				value={value}
				onValueChange={onValueChange}
				options={options}
			/>
		</div>
	)
}

const ItemCheckbox = ({ label, children, ...rest }) => {
	return (
		<div className={styles.item} {...rest}>
			<div className={styles.label}>{label}</div>
			<div className={styles.children}>{children}</div>
		</div>
	)
}

export default OptionsView
