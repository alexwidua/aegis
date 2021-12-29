/**
 * @file Core game logic
 */

import { useEffect } from 'react'
import useStore from '../store/store'
import useKeyPress from '../hooks/useKeyPress'
import useGameState from '../hooks/useGameState'

const useGameLogic = () => {
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
	}, [_keyPressed])

	/**
	 * Handle game state updates
	 */
	useEffect(() => {
		let interval
		const interval_duration = 300
		if (playerKeyIncorrect) {
			interval = setInterval(
				() => handleResetKeyInput(),
				interval_duration
			)
		} else if (playerSecondKeyCorrect) {
			interval = setInterval(
				() => handleAfterPlayerScored(),
				interval_duration
			)
		}
		return () => clearInterval(interval)
	}, [playerKeyIncorrect, playerSecondKeyCorrect])

	/**
	 * Check if game ends
	 */
	useEffect(() => {
		if (score === scoreLimit) {
			handleGameEnd()
		}
	}, [score, scoreLimit])

	return null
}

export default useGameLogic
