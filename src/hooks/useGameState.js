/**
 * @file Hook to better access common game states
 */
import useStore from '../store/store'

const useGameState = () => {
	const {
		keyboardLayout,
		currentBuilding,
		gameState,
		_firstKey,
		_secondKey
	} = useStore((state) => ({
		keyboardLayout: state.keyboardLayout,
		gameState: state.gameState,
		currentBuilding: state.recipe ? state.recipe[state.recipeIndex] : null,
		_firstKey: state.recipe
			? state.recipe[state.recipeIndex]?.hotkeys[0]
			: null,
		_secondKey: state.recipe
			? state.recipe[state.recipeIndex]?.hotkeys[1]
			: null
	}))

	const firstKey =
		_firstKey && typeof _firstKey === 'object'
			? _firstKey[keyboardLayout]
			: _firstKey || null
	const secondKey =
		_secondKey && typeof _secondKey === 'object'
			? _secondKey[keyboardLayout]
			: _secondKey || null

	const gameAwaitingInput = gameState === '0/2'
	const gameEnded = gameState === 'GAME_END'
	const playerFirstKeyCorrect = gameState === '1/2'
	const playerSecondKeyCorrect = gameState === '2/2'
	const playerKeyIncorrect = gameState === 'INCORRECT_INPUT'

	return {
		firstKey,
		secondKey,
		currentBuilding,
		gameAwaitingInput,
		gameEnded,
		playerFirstKeyCorrect,
		playerSecondKeyCorrect,
		playerKeyIncorrect
	}
}

export default useGameState
