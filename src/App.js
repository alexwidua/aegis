/**
 * @file App, collects all views
 */
import { useState, useEffect } from 'react'
import styles from './app.module.scss'

import useStore from './store/store'
import useGameLogic from './game/useGameLogic'
import useGameState from './hooks/useGameState'

import { InitialView, GameView, ResultView, OptionsView } from './views'
import Modal from 'react-modal'
import Button from './components/ui/Button'

Modal.setAppElement('#root')

const App = () => {
	/**
	 * Game-related states
	 */
	useGameLogic()
	const { isPlaying, endResult, handleGameStart, handleGameEnd } = useStore(
		(state) => ({
			isPlaying: state.isPlaying,
			endResult: state.endResult,
			handleGameStart: state.handleGameStart,
			handleGameEnd: state.handleGameEnd
		})
	)
	const { gameEnded, playerSecondKeyCorrect } = useGameState()

	/**
	 * UI states
	 */
	const [modal, setModal] = useState(false)

	return (
		<div
			className={`${styles.wrapper} ${
				playerSecondKeyCorrect ? styles.scored : null
			}`}>
			<div className={styles.container}>
				{isPlaying && !gameEnded ? (
					<GameView />
				) : !isPlaying && gameEnded ? (
					<ResultView />
				) : (
					<InitialView />
				)}
				{!isPlaying && (
					<div className={styles['button-row']}>
						<Button
							onClick={handleGameStart}
							style={{ minWidth: '12rem' }}
							primary>
							{endResult ? 'Play again' : 'Play'}
						</Button>
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

/**
 * Options modal window
 */
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
