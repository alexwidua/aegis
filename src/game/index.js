/**
 * @file Core game logic
 */

import { useEffect } from 'react'
import useStore from '../store'
import useKeyPress from '../hooks/useKeyPress'
import useGameState from '../hooks/useGameState'

/**
 * Constants
 */

const GAME_INTERVAL_AFTER_CORRECT_INPUT = 300

const Game = () => {
	/**
	 * Game internal state & handlers
	 */
	const { isPlaying, score, scoreLimit, startTime } = useStore((state) => ({
		isPlaying: state.isPlaying,
		score: state.score,
		scoreLimit: state.scoreLimit,
		startTime: state.startTime
	}))

	const {
		handleSetStartTime,
		handleFirstKeyCorrect,
		handleSecondKeyCorrect,
		handleKeyIncorrect,
		handleResetKeyInput,
		handleAfterPlayerScored,
		handleGameEnd,
		handleKeyPressed
	} = useStore((state) => ({
		handleSetStartTime: state.handleSetStartTime,
		handleFirstKeyCorrect: state.handleFirstKeyCorrect,
		handleSecondKeyCorrect: state.handleSecondKeyCorrect,
		handleKeyIncorrect: state.handleKeyIncorrect,
		handleResetKeyInput: state.handleResetKeyInput,
		handleAfterPlayerScored: state.handleAfterPlayerScored,
		handleGameEnd: state.handleGameEnd,
		handleKeyPressed: state.handleKeyPressed
	}))

	const {
		firstKey,
		secondKey,
		gameAwaitingInput,
		playerFirstKeyCorrect,
		playerSecondKeyCorrect,
		playerKeyIncorrect
	} = useGameState()

	/**
	 * Handle KeyPress event
	 */
	const _keyPressed = useKeyPress((key) => {
		if (!isPlaying) return
		if (!startTime) {
			handleSetStartTime()
		}

		if (gameAwaitingInput) {
			if (key === firstKey) {
				handleFirstKeyCorrect()
			} else {
				handleKeyIncorrect()
			}
		} else if (playerFirstKeyCorrect) {
			if (key === secondKey) {
				handleSecondKeyCorrect()
			} else {
				handleKeyIncorrect()
			}
		}
	})

	// Update global ui state when key pressed
	useEffect(() => {
		handleKeyPressed(_keyPressed)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_keyPressed])

	/**
	 * Handle game state updates
	 */
	useEffect(() => {
		let timeout
		if (playerKeyIncorrect) {
			timeout = setTimeout(
				() => handleResetKeyInput(),
				GAME_INTERVAL_AFTER_CORRECT_INPUT
			)
		} else if (playerSecondKeyCorrect) {
			timeout = setTimeout(
				() => handleAfterPlayerScored(),
				GAME_INTERVAL_AFTER_CORRECT_INPUT
			)
		}
		return () => clearTimeout(timeout)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerKeyIncorrect, playerSecondKeyCorrect])

	/**
	 * Handle game end
	 */
	useEffect(() => {
		let timeout
		if (score === scoreLimit) {
			timeout = setTimeout(() => {
				handleGameEnd()
			}, GAME_INTERVAL_AFTER_CORRECT_INPUT)
		}

		return () => clearTimeout(timeout)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [score, scoreLimit])

	return null
}

export default Game
