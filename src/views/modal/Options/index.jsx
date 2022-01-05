/**
 * @file The options view handles all game settings.
 * It's divided into a GameOptions component, which deals with all game-related settings,
 * and a KeyboardOptions component, which deals with the keyboard mapping etc.
 */

import useStore from '@store'
import { useEffect } from 'react'
import { useEffectOnce, useLocalStorage } from '@hooks'
import GameOptions from './GameOptions'
import KeyboardOptions from './KeyboardOptions'
import { LOCAL_STORAGE_KEY } from '@store/constants'
import styles from './index.module.scss'

const OptionsView = () => {
	/**
	 * Let's get all option values and option setters from our useStore hook.
	 */
	const {
		keyboardMap,
		scoreLimit,
		showKeyLabels,
		iconStyle,
		buildingFilter,
		updateGameSettingsFromLocalStorage
	} = useStore((state) => ({
		keyboardMap: state.keyboardMap,
		scoreLimit: state.scoreLimit,
		showKeyLabels: state.showKeyLabels,
		iconStyle: state.iconStyle,
		buildingFilter: state.buildingFilter,
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

	const gameOptions = {
		scoreLimit,
		buildingFilter,
		showKeyLabels,
		keyboardMap,
		iconStyle
	}

	// First, check if LOCAL_STORAGE_KEY has been set, if not populate it
	useEffectOnce(() => {
		if (!localStorageOptions) {
			setLocalStorageOptions(gameOptions)
		} else {
			updateGameSettingsFromLocalStorage(localStorageOptions)
		}
	})

	// Update local store when game option changes
	useEffect(() => {
		setLocalStorageOptions(gameOptions)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		keyboardMap,
		scoreLimit,
		showKeyLabels,
		iconStyle,
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

	return (
		<div className={styles.container}>
			<GameOptions />
			<KeyboardOptions />
		</div>
	)
}

export default OptionsView
