import { useState, useRef, useCallback } from 'react'
import useStore from '../../store'
import { useOnClickOutside, useKeyPress, useEffectOnce } from '../../hooks'

import styles from './keyboardOptions.module.scss'
import { WrapSegmentedInputComponent } from './shared'

// Assets
import buildings from '../../assets/buildings'

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

const KeyboardOptions = () => {
	/**
	 * Get all option values and setters from Zustand
	 */
	const { keyMap, handleSetKeyMap, handleSetKeyMapDefault, buildingFilter } =
		useStore((state) => ({
			keyMap: state.keyMap,
			handleSetKeyMap: state.handleSetKeyMap,
			handleSetKeyMapDefault: state.handleSetKeyMapDefault,
			buildingFilter: state.buildingFilter
		}))
	// Show or hide building icon overlay
	const [showKeyboardIconOverlay, setShowKeyboardIconOverlay] = useState(null)

	// We want to show a css animation once key changes, but we don't want to flash the keys initially.
	// We inject the CSS var for the animation color programmatically after the initial animation has been run.
	const [keyHighlightOnChange, setkeyHighlightOnChange] = useState(
		'rgba(255,255,255,0)'
	)
	useEffectOnce(() => {
		const injectCSSVarAfterInitialAnimCycle = setTimeout(
			() => setkeyHighlightOnChange('rgba(255,255,255,0.3)'),
			300
		)
		return () => clearTimeout(injectCSSVarAfterInitialAnimCycle)
	})

	/**
	 * Handle re-mapping of keys.
	 * If the user clicks a key, keyCanBeMapped will be set to the to-be-mapped key
	 * and will listen for changes through the useKeyPress hook.
	 * If the user can cancel the action by clicking outside the grid or ESCing (which closes the modal).
	 */
	const gridRef = useRef()
	const [keyCanBeMapped, setKeyCanBeMapped] = useState('')

	// Cancel key rebind when clicked outside of keymap area
	useOnClickOutside(gridRef, () => setKeyCanBeMapped(''))

	useKeyPress((key) => {
		if (!keyCanBeMapped) return
		if (key === 'Escape') return setKeyCanBeMapped('')

		const row = keyCanBeMapped[0]
		const col = keyCanBeMapped[1]

		// If the new key is already mapped, re-move the mapping from the other occurence
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
		setKeyCanBeMapped('')
	})

	/**
	 * Handle keyboard defaul layout menu
	 */
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
		// If the user clicks the Custom button, reset all key mappings
		if (layout === 'CUSTOM') {
			handleSetKeyMapDefault(defaultLayouts.undefined)
		} else handleSetKeyMapDefault(defaultLayouts[layout])
	}

	return (
		<div className={styles.container}>
			<h2>Keyboard profile</h2>
			<p>
				Select an existing profile or re-map individual keys by clicking
				on the respective button.
			</p>
			<div className={styles.inner}>
				<h3 style={{ alignSelf: 'flex-start' }}>Current layout</h3>
				<WrapSegmentedInputComponent
					name={`keymapOverlay`}
					value={deriveKeyboardLayoutFromMapping() || 'NULL'}
					onValueChange={(value) => handleKeyboardLayoutChange(value)}
					options={[
						{ children: 'QWERTY', value: 'QWERTY' },
						{ children: 'QWERTY', value: 'QWERTZ' },
						{ children: 'AZERTY', value: 'AZERTY' },
						{ children: 'Dvorak', value: 'DVORAK' },
						{ children: 'Custom', value: 'NULL' }
					]}
				/>
				<div className={styles.grid} ref={gridRef}>
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
											el.age === showKeyboardIconOverlay
									)
									const keyCanBeRemapped =
										row === keyCanBeMapped[0] &&
										col === keyCanBeMapped[1]

									return (
										<button
											onClick={() =>
												setKeyCanBeMapped([row, col])
											}
											style={{
												'--flash': keyHighlightOnChange
											}}
											className={`
												${styles.key} 
                                                ${styles.highlight} 
												${keyCanBeRemapped ? styles.rebind : null}
												${el === '?' ? styles.missing : null}	

										`}
											key={el === '?' ? col : el}>
											<span>
												{keyCanBeRemapped
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
				<WrapSegmentedInputComponent
					name={`d`}
					label={`Show icon overlay`}
					value={showKeyboardIconOverlay}
					onValueChange={(value) => setShowKeyboardIconOverlay(value)}
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
	)
}

export default KeyboardOptions
