/**
 * Main
 */
import useStore from './store/store'
import { useState, useEffect } from 'react'
import useGameLogic from './game/useGameLogic'
import GameView from './views/GameView'
import ResultView from './views/ResultView'

import Button from './components/ui/Button'

import InitialView from './views/InitialView'
import OptionsView from './views/OptionsView'

import styles from './app.module.scss'

import Modal from 'react-modal'

import useGameState from './hooks/useGameState'

Modal.setAppElement('#root')

const App = () => {
	/**
	 * Game-related states
	 */
	useGameLogic()
	const { isPlaying, endResult, handleGameStart } = useStore((state) => ({
		isPlaying: state.isPlaying,
		endResult: state.endResult,
		handleGameStart: state.handleGameStart
	}))
	const { playerSecondKeyCorrect } = useGameState()

	/**
	 * UI states
	 */
	const [initial, setInitial] = useState(true)
	const [modal, setModal] = useState(false)

	const showInitialView = initial && !isPlaying
	const showGameView = isPlaying
	const showResultView = !isPlaying && !initial
	const showButtonMenu = !isPlaying

	useEffect(() => {
		if (isPlaying && initial) {
			setInitial(false)
		}
	}, [isPlaying])

	return (
		<div
			className={`${styles.wrapper} ${
				playerSecondKeyCorrect ? styles.scored : null
			}`}>
			<div className={styles.container}>
				{/* Show initial startup screen */}
				{showInitialView && <InitialView />}

				{/* Show game view */}
				{showGameView && <GameView />}

				{/* Show result view once game finishes */}
				{showResultView && <ResultView />}

				{showButtonMenu && (
					<div className={styles['button-row']}>
						<Button onClick={handleGameStart}>Play</Button>
						<Button onClick={() => setModal(true)}>Options</Button>
					</div>
				)}
			</div>
			<OptionsModal
				isOpen={modal}
				onRequestClose={() => setModal(false)}
			/>
		</div>
	)
}

const OptionsModal = ({ isOpen, onRequestClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className={styles['modal-content']}
			overlayClassName={styles['modal-overlay']}>
			<button
				className={styles['modal-btn-close']}
				onClick={onRequestClose}>
				✗
			</button>
			<OptionsView />
		</Modal>
	)
}

export default App
