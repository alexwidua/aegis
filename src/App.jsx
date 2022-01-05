/**
 * @file Main app file that collects all views.
 *
 * This app consist of multiple views, each of which corresponds to the current game view. Conceptually, the views are similar to routes.
 */

import game from '@game/'
import useStore from '@store/'
import { useGameState } from '@hooks/'
import {
	BeforeGameStart,
	Game,
	GameEnd,
	Options,
	ShowWarningOnMobile
} from '@views'
import ModalWindow from './components/Modal'
import Modal from 'react-modal'
import styles from './app.module.scss'

Modal.setAppElement('#root')

const App = () => {
	game()
	const { optionsModalOpen, setOptionsModalOpen, isPlaying, endResult } =
		useStore((state) => ({
			optionsModalOpen: state.optionsModalOpen,
			setOptionsModalOpen: state.setOptionsModalOpen,
			isPlaying: state.isPlaying,
			endResult: state.endResult
		}))
	const { gameEnded } = useGameState()

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
