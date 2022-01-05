/**
 * @file Main app file that collects all views.
 *
 * This app consist of multiple views, each of which corresponds to the current game view. Conceptually, the views are similar to routes.
 */

import game from '@game/'
import useStore from '@store/'
import { useGameState, useEffectOnce, useLocalStorage } from '@hooks/'
import {
	BeforeGameStart,
	Game,
	GameEnd,
	Options,
	ShowWarningOnMobile
} from '@views'
import ModalWindow from './components/Modal'
import Modal from 'react-modal'
import { LOCAL_STORAGE_KEY } from '@store/constants'
import styles from './app.module.scss'

Modal.setAppElement('#root')

const App = () => {
	/**
	 * 1. Set up game and get game states to delegate views.
	 */
	game()
	const {
		optionsModalOpen,
		setOptionsModalOpen,
		isPlaying,
		endResult,
		defaultGameOptions,
		updateGameSettingsFromLocalStorage
	} = useStore((state) => ({
		optionsModalOpen: state.optionsModalOpen,
		setOptionsModalOpen: state.setOptionsModalOpen,
		isPlaying: state.isPlaying,
		endResult: state.endResult,
		defaultGameOptions: {
			scoreLimit: state.scoreLimit,
			buildingFilter: state.buildingFilter,
			showKeyLabels: state.showKeyLabels,
			keyboardMap: state.keyboardMap,
			iconStyle: state.iconStyle
		},
		updateGameSettingsFromLocalStorage:
			state.updateGameSettingsFromLocalStorage
	}))
	const { gameEnded } = useGameState()

	/**
	 * 2. Check if local storage has been set.
	 *    If yes, update game settings from local storage.
	 *    If not, populate local storage with default game options.
	 */
	const [localStorageOptions, setLocalStorageOptions] = useLocalStorage(
		LOCAL_STORAGE_KEY,
		''
	)
	useEffectOnce(() => {
		if (!localStorageOptions) {
			setLocalStorageOptions(defaultGameOptions)
		} else {
			updateGameSettingsFromLocalStorage(localStorageOptions)
		}
	})

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{isPlaying && !gameEnded ? (
					<Game />
				) : !isPlaying && gameEnded ? (
					<GameEnd />
				) : endResult ? (
					<GameEnd />
				) : (
					<BeforeGameStart />
				)}
			</div>

			{/* Conditional modal windows that are detached from page */}
			<ModalWindow
				isOpen={optionsModalOpen}
				onRequestClose={() => setOptionsModalOpen(false)}>
				<Options />
			</ModalWindow>
			<ShowWarningOnMobile />
		</div>
	)
}

export default App
