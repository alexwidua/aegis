/**
 * @file App, collects all views
 */

import game from './game/'
import useStore from './store/'
import { useGameState } from './hooks/'
import styles from './app.module.scss'
import {
	LandingPage,
	Game,
	Result,
	Options,
	MessageOnMobile,
	Footer
} from './views'

import ModalWindow from './components/Modal'

import Modal from 'react-modal'
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
					<Result />
				) : endResult ? (
					<Result />
				) : (
					<LandingPage />
				)}
			</div>

			{/* Conditional modal windows that are detached from page */}
			<ModalWindow
				isOpen={optionsModalOpen}
				onRequestClose={() => setOptionsModalOpen(false)}>
				<Options />
			</ModalWindow>
			<MessageOnMobile />

			{!isPlaying && <Footer />}
		</div>
	)
}

export default App
