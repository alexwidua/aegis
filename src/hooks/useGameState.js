/**
 * @file Hook to better access common game states
 */
import useStore from '../store/store'

const useGameState = () => {
	const { score, scoreLimit, building, gameState, keyMap } = useStore(
		(state) => ({
			score: state.score,
			scoreLimit: state.scoreLimit,
			gameState: state.gameState,
			building: {
				preemptive: state.recipe
					? state.recipe[state.tickPreemptive]
					: null,
				current: state.recipe ? state.recipe[state.tick] : null
			},
			keyMap: state.keyMap
		})
	)

	/**
	 * current vs. preemptive value
	 *
	 * If a shortcut has been entered correctly, there is a brief
	 * interval before the game progresses to the next shortcut.
	 *
	 * preemptive === next shortcut, set pre-emtpively BEFORE interval finishes
	 * current === next shortcut, set AFTER interval finishes (in that sense, it catches up to the preemptive value)
	 */

	const shortcut = {
		preemptive: building.preemptive ? building.preemptive.shortcut : null,
		current: building.current ? building.current.shortcut : null
	}

	const keyPosition = {
		preemptive: {
			firstKey: shortcut.preemptive
				? shortcut.preemptive[0].split(':')
				: null,
			secondKey: shortcut.preemptive
				? shortcut.preemptive[1].split(':')
				: null
		},
		current: {
			firstKey: shortcut.current ? shortcut.current[0].split(':') : null,
			secondKey: shortcut.current ? shortcut.current[1].split(':') : null
		}
	}

	const firstKey = keyPosition.current.firstKey
		? keyMap[keyPosition.current.firstKey[0]][
				keyPosition.current.firstKey[1]
		  ]
		: null
	const secondKey = keyPosition.current.secondKey
		? keyMap[keyPosition.current.secondKey[0]][
				keyPosition.current.secondKey[1]
		  ]
		: null

	const gameAwaitingInput = gameState === '0/2'
	const gameEnded = gameState === 'GAME_ENDED'
	const playerFirstKeyCorrect = gameState === '1/2'
	const playerSecondKeyCorrect = gameState === '2/2'
	const playerKeyIncorrect = gameState === 'INCORRECT_INPUT'

	return {
		firstKey,
		secondKey,
		keyPosition,
		building,
		gameAwaitingInput,
		gameEnded,
		playerFirstKeyCorrect,
		playerSecondKeyCorrect,
		playerKeyIncorrect
	}
}

export default useGameState
