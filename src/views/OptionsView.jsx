import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './options.module.scss'
import useStore from '../store/store'
import {
	useOnClickOutside,
	useKeyPress,
	useEffectOnce,
	useLocalStorage
} from '../hooks'
import SegmentedInput from '../components/ui/SegmentedInput'
import Checkbox from '../components/ui/Checkbox'

// Assets
import buildings from '../assets/buildings'
import IconGeneric from '../assets/icons/flags/generic.png'
import IconMongol from '../assets/icons/flags/mongol.png'
import IconRus from '../assets/icons/flags/rus.png'
import IconChinese from '../assets/icons/flags/chinese.png'
import IconDelhi from '../assets/icons/flags/delhi.png'
import IconAbbasid from '../assets/icons/flags/abbasid.png'

const LOCAL_STORAGE_KEY = 'aoe-shortcuts-v060'
const getKeyboardDefaults = () => ({
	QWERTY: [
		['q', 'w', 'e', 'r'],
		['a', 's', 'd', 'f'],
		['z', 'x', 'c', 'v']
	],
	QWERTZ: [
		['q', 'w', 'e', 'r'],
		['a', 's', 'd', 'f'],
		['y', 'x', 'c', 'v']
	],
	AZERTY: [
		['a', 'z', 'e', 'r'],
		['q', 's', 'd', 'f'],
		['w', 'x', 'c', 'v']
	],
	DVORAK: [
		["'", ',', '.', 'p'],
		['a', 'o', 'e', 'u'],
		[';', 'q', 'j', 'k']
	],
	NULL: [
		['?', '?', '?', '?'],
		['?', '?', '?', '?'],
		['?', '?', '?', '?']
	]
})

const OptionsView = () => {
	/**
	 * Let's get all option values and option setters from our useStore hook.
	 */
	const {
		keyMap,
		handleSetKeyMap,
		handleSetKeyMapDefault,
		scoreLimit,
		handleSetScoreLimit,
		showKeyLabels,
		handleSetShowKey,
		promptStyle,
		handleSetPromptStyle,
		buildingFilter,
		handleSetBuildingFilter,
		updateGameSettingsFromLocalStorage
	} = useStore((state) => ({
		keyMap: state.keyMap,
		handleSetKeyMap: state.handleSetKeyMap,
		handleSetKeyMapDefault: state.handleSetKeyMapDefault,
		scoreLimit: state.scoreLimit,
		handleSetScoreLimit: state.handleSetScoreLimit,
		showKeyLabels: state.showKeyLabels,
		handleSetShowKey: state.handleSetShowKey,
		promptStyle: state.promptStyle,
		handleSetPromptStyle: state.handleSetPromptStyle,
		buildingFilter: state.buildingFilter,
		handleSetBuildingFilter: state.handleSetBuildingFilter,
		updateGameSettingsFromLocalStorage:
			state.updateGameSettingsFromLocalStorage
	}))
	const { ages, types, group } = buildingFilter

	/**
	 * Handle local storage.
	 */
	const [localStorageOptions, setLocalStorageOptions] = useLocalStorage(
		LOCAL_STORAGE_KEY,
		''
	)

	// First, check if LOCAL_STORAGE_KEY has been set, if not populate it
	useEffectOnce(() => {
		if (!localStorageOptions) {
			setLocalStorageOptions({
				scoreLimit,
				buildingFilter,
				showKeyLabels,
				keyMap,
				promptStyle
			})
		} else {
			updateGameSettingsFromLocalStorage(localStorageOptions)
		}
	})

	//Update local store on game option changes
	useEffect(() => {
		setLocalStorageOptions({
			scoreLimit,
			buildingFilter,
			showKeyLabels,
			keyMap,
			promptStyle
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		keyMap,
		scoreLimit,
		showKeyLabels,
		promptStyle,
		group,
		ages.I,
		ages.II,
		ages.III,
		ages.IV,
		types.economic,
		types.military,
		types.fortified,
		types.research
	])

	/**
	 * Handle key remap logic, ex. rebinding keys
	 */

	const keymapRef = useRef()
	const [keyRebind, setkeyRebind] = useState('')
	// Show or hide building icon overlay
	const [showKeyboardIconOverlay, setShowKeyboardIconOverlay] = useState(null)

	// Cancel key rebind when clicked outside of keymap area
	useOnClickOutside(keymapRef, () => setkeyRebind(''))

	useKeyPress((key) => {
		if (!keyRebind) return
		const row = keyRebind[0]
		const col = keyRebind[1]

		// If duplicate, clear other duplicate key
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

	// Check if one of the current layouts matches one of the default profiles
	const deriveKeyboardLayoutFromMapping = useCallback(() => {
		const defaultLayouts = getKeyboardDefaults()
		return Object.keys(defaultLayouts).find(
			(key) =>
				JSON.stringify(defaultLayouts[key]) === JSON.stringify(keyMap)
		)
	}, [keyMap])

	const handleKeyboardLayoutChange = (layout) => {
		const defaultLayouts = getKeyboardDefaults()
		// If the user clicks the Custom button, reset all keys
		if (layout === 'CUSTOM') {
			handleSetKeyMapDefault(defaultLayouts.undefined)
		} else handleSetKeyMapDefault(defaultLayouts[layout])
	}

	/**
	 * Handle building filter options
	 */
	const handleFilter = useCallback(
		(category, key, isCheckbox) => {
			const obj = buildingFilter
			if (isCheckbox) obj[category][key] = !obj[category][key]
			else obj[category] = key
			handleSetBuildingFilter(obj)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[buildingFilter]
	)

	return (
		<div className={styles.container}>
			<div className={styles.options}>
				<h2>Options</h2>
				{/*
				 * Display
				 */}
				<h3>Buildings</h3>
				<ItemSegmentedInput
					name={`buildings`}
					label={`Number of buildings each game`}
					value={scoreLimit}
					onValueChange={(value) => handleSetScoreLimit(value)}
					options={[{ value: 25 }, { value: 50 }, { value: 100 }]}
					style={{ marginBottom: '1.25rem' }}
				/>
				<ItemSegmentedInput
					name={`civ`}
					label={`Civilization`}
					value={group}
					onValueChange={(value) => handleFilter('group', value)}
					options={[
						{
							children: `<img src="${IconGeneric}" alt="Flag"/>`,
							value: 'GENERIC'
						},
						{
							children: `<img src="${IconMongol}" alt="Flag"/>`,
							value: 'MONGOL'
						},
						{
							children: `<img src="${IconRus}" alt="Flag"/>`,
							value: 'RUS'
						},
						{
							children: `<img src="${IconChinese}" alt="Flag"/>`,
							value: 'CHINESE'
						},
						{
							children: `<img src="${IconDelhi}" alt="Flag"/>`,
							value: 'DELHI'
						},
						{
							children: `<img src="${IconAbbasid}" alt="Flag"/>`,
							value: 'ABBASID'
						}
					]}
					style={{ marginBottom: '1.25rem' }}
				/>
				<ItemCheckbox
					label={`Restrict to age`}
					style={{ marginBottom: '1.25rem' }}>
					{Object.keys(ages).map((el, i) => (
						<Checkbox
							value={ages[el]}
							onChange={() => handleFilter('ages', el, true)}
							key={i}
							style={{ textTransform: 'uppercase' }}>
							{el}
						</Checkbox>
					))}
				</ItemCheckbox>
				<ItemCheckbox label={`Restrict to type`}>
					{Object.keys(types).map((el, i) => (
						<Checkbox
							value={types[el]}
							onChange={() => handleFilter('types', el, true)}
							key={i}>
							{el}
						</Checkbox>
					))}
				</ItemCheckbox>
				{/*
				 * Display
				 */}
				<h3>Display</h3>
				<ItemSegmentedInput
					name={`showLabels`}
					label={`Show key labels on buttons`}
					value={showKeyLabels}
					onValueChange={(value) => handleSetShowKey(value)}
					options={[
						{ children: 'Show', value: 'SHOW' },
						{ children: 'Fade in after 1s', value: 'FADE_IN' },
						{ children: 'Hide', value: 'HIDE' }
					]}
				/>
				<ItemSegmentedInput
					name={`promptStyle`}
					label={`Icon style <span class='new'>New</span>`}
					value={promptStyle}
					onValueChange={(value) => handleSetPromptStyle(value)}
					options={[
						{ children: 'Single icon', value: 'SINGLE' },
						{ children: 'Spatial grid', value: 'GRID' }
					]}
				/>
			</div>
			<div className={styles['keyboard-options']}>
				<h2>
					Keyboard profile <span className={`new`}>New</span>
				</h2>
				<p>
					Select an existing profile or re-map individual keys by
					clicking on the respective button.
				</p>
				<div className={styles['keyboard-options-container']}>
					<h3 style={{ alignSelf: 'flex-start' }}>Current layout</h3>
					<ItemSegmentedInput
						name={`keymapOverlay`}
						value={deriveKeyboardLayoutFromMapping() || 'NULL'}
						onValueChange={(value) =>
							handleKeyboardLayoutChange(value)
						}
						options={[
							{ children: 'QWERTY', value: 'QWERTY' },
							{ children: 'QWERTY', value: 'QWERTZ' },
							{ children: 'AZERTY', value: 'AZERTY' },
							{ children: 'Dvorak', value: 'DVORAK' },
							{ children: 'Custom', value: 'NULL' }
						]}
					/>

					<div className={styles.grid} ref={keymapRef}>
						{keyMap.map((el, row) => {
							return (
								<div className={styles.row} key={row}>
									{el.map((el, col) => {
										const building = buildings.find(
											(el) =>
												el.shortcut[1][0] ===
													row.toFixed() &&
												el.shortcut[1][2] ===
													col.toFixed() &&
												(el.group ===
													buildingFilter.group ||
													el.group === 'COMMON') &&
												el.age ===
													showKeyboardIconOverlay
										)
										const pendingRebind =
											row === keyRebind[0] &&
											col === keyRebind[1]

										return (
											<button
												onClick={() =>
													setkeyRebind([row, col])
												}
												className={`
												${styles.key} 
												${pendingRebind ? styles.rebind : null}
												${el === '?' ? styles.missing : null}				
										`}
												key={col}>
												<span>
													{pendingRebind
														? 'Press Key'
														: el}
												</span>
												{building &&
													showKeyboardIconOverlay && (
														<div
															className={`
														${styles.icon} 
														`}>
															<img
																src={
																	building.icon
																}
																alt={
																	building.name
																}
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
					<ItemSegmentedInput
						name={`d`}
						label={`Show icon overlay`}
						value={showKeyboardIconOverlay}
						onValueChange={(value) =>
							setShowKeyboardIconOverlay(value)
						}
						options={[
							{ children: 'Hide', value: null },
							{ children: 'Age I', value: 'I' },
							{ children: 'Age II', value: 'II' },
							{ children: 'Age III', value: 'III' },
							{ children: 'Age IV', value: 'IV' }
						]}
						style={{ width: 356 }}
					/>
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
			<div
				className={styles.label}
				dangerouslySetInnerHTML={{ __html: label }}
			/>
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
