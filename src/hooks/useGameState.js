/**
 * @file Hook to better access common game states
 */
import useStore from '../store/store'

const useGameState = () => {
	const {
		score,
		scoreLimit,
		currentBuilding,
		gameState,
		shortcut,
		_shortcut,
		keyMap
	} = useStore((state) => ({
		score: state.score,
		scoreLimit: state.scoreLimit,
		gameState: state.gameState,
		currentBuilding: state.recipe ? state.recipe[state.score] : null,
		shortcut: state.recipe ? state.recipe[state.tick]?.shortcut : null,
		_shortcut: state.recipe ? state.recipe[state.score]?.shortcut : null, // TODO: proper name,unify tick and score
		keyMap: state.keyMap
	}))

	// Each shortcut is stored as a coordinate for an 2d array, ex. 0:0
	const firstKeyIndex = shortcut ? shortcut[0].split(':') : null
	const secondKeyIndex = shortcut ? shortcut[1].split(':') : null

	// TODO: Remove or unify w/ above
	const _firstKeyIndex = _shortcut ? _shortcut[0].split(':') : null
	const _secondKeyIndex = _shortcut ? _shortcut[1].split(':') : null

	const firstKey = firstKeyIndex
		? keyMap[firstKeyIndex[0]][firstKeyIndex[1]]
		: null
	const secondKey = secondKeyIndex
		? keyMap[secondKeyIndex[0]][secondKeyIndex[1]]
		: null

	const gameAwaitingInput = gameState === '0/2'
	const gameEnded = score === scoreLimit
	const playerFirstKeyCorrect = gameState === '1/2'
	const playerSecondKeyCorrect = gameState === '2/2'
	const playerKeyIncorrect = gameState === 'INCORRECT_INPUT'

	return {
		firstKey,
		secondKey,
		_firstKeyIndex,
		_secondKeyIndex,
		currentBuilding,
		gameAwaitingInput,
		gameEnded,
		playerFirstKeyCorrect,
		playerSecondKeyCorrect,
		playerKeyIncorrect
	}
}

export default useGameState
