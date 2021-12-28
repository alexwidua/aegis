import { useEffect } from 'react'
import useStore from '../store/store'
import useKeyPress from '../hooks/useKeyPress'
import useGameState from '../hooks/useGameState'

const useGameLogic = () => {
	/**
	 * Game internal state & handlers
	 */
	const { isPlaying, score, scoreLimit, startTime, firstKey, secondKey } =
		useStore((state) => ({
			isPlaying: state.isPlaying,
			score: state.score,
			scoreLimit: state.scoreLimit,
			startTime: state.startTime,
			firstKey: state.gameCurrentBuildingPrompt.hotkeys[0],
			secondKey: state.gameCurrentBuildingPrompt.hotkeys[1]
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

	useEffect(() => {
		handleKeyPressed(_keyPressed)
	}, [_keyPressed])

	/**
	 * Handle game state updates
	 */
	useEffect(() => {
		let interval
		if (playerKeyIncorrect) {
			interval = setInterval(() => handleResetKeyInput(), 1000)
		} else if (playerSecondKeyCorrect) {
			interval = setInterval(() => handleAfterPlayerScored(), 1000)
		}
		return () => clearInterval(interval)
	}, [playerKeyIncorrect, playerSecondKeyCorrect])

	useEffect(() => {
		if (score === scoreLimit) {
			handleGameEnd()
		}
	}, [score, scoreLimit])

	return null
}

export default useGameLogic
