import { useEffect } from 'react'
import useStore from '../../store'
import { useEffectOnce, useLocalStorage } from '../../hooks'
import styles from './index.module.scss'
import GameOptions from './GameOptions'
import KeyboardOptions from './KeyboardOptions'

const LOCAL_STORAGE_KEY = 'aoe-shortcuts-v060'

const OptionsView = () => {
	/**
	 * Let's get all option values and option setters from our useStore hook.
	 */
	const {
		keyMap,
		scoreLimit,
		showKeyLabels,
		iconStyle,
		buildingFilter,
		updateGameSettingsFromLocalStorage
	} = useStore((state) => ({
		keyMap: state.keyMap,
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

	// First, check if LOCAL_STORAGE_KEY has been set, if not populate it
	useEffectOnce(() => {
		if (!localStorageOptions) {
			setLocalStorageOptions({
				scoreLimit,
				buildingFilter,
				showKeyLabels,
				keyMap,
				iconStyle
			})
		} else {
			updateGameSettingsFromLocalStorage(localStorageOptions)
		}
	})

	// Update local store when game option changes
	useEffect(() => {
		setLocalStorageOptions({
			scoreLimit,
			buildingFilter,
			showKeyLabels,
			keyMap,
			iconStyle
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		keyMap,
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
