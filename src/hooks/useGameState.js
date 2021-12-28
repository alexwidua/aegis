import useStore from '../store/store'

const useGameState = () => {
	const { gameState } = useStore((state) => ({
		gameState: state.gameState
	}))

	const gameAwaitingInput = gameState === '0/2'
	const playerFirstKeyCorrect = gameState === '1/2'
	const playerSecondKeyCorrect = gameState === '2/2'
	const playerKeyIncorrect = gameState === 'INCORRECT_INPUT'

	return {
		gameAwaitingInput,
		playerFirstKeyCorrect,
		playerSecondKeyCorrect,
		playerKeyIncorrect
	}
}

export default useGameState
