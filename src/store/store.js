import create from 'zustand'
import buildings from '../assets/buildings'
import { currentTimeInSeconds } from '../utils/time'

import {
	calcActionsPerMinute,
	calcKeyAccuracy,
	returnRandomIndex
} from '../utils/math'

const defaultBuildingPrompt = buildings[0]

const useStore = create((set) => ({
	keyPressed: false,
	handleKeyPressed: (value) => set(() => ({ keyPressed: value })),
	isPlaying: false,
	/**
	 * Game user state
	 */
	score: 0,
	scoreLimit: 25,
	startTime: 0,
	incorrectInputs: 0,
	showKeyLabels: 'FADE_IN',
	/**
	 * Game internal state
	 */
	gameState: '0/2',
	gameCurrentBuildingPrompt: defaultBuildingPrompt,
	// Misc
	endResult: [
		{ type: 'Buildings', value: 25 },
		{ type: 'Buildings / Minute', value: 64.4444 },
		{ type: 'Accuracy', value: 66.6666 }
	],
	handleSetStartTime: () =>
		set(() => ({ startTime: currentTimeInSeconds() })),
	/**
	 * Handle option change
	 */
	handleScoreLimitChange: (value) => set(() => ({ scoreLimit: value })),
	handleShowKeyLabels: (value) => set(() => ({ showKeyLabels: value })),
	/**
	 * Handle hotkey events
	 */
	handleFirstKeyCorrect: () => set(() => ({ gameState: '1/2' })),
	handleSecondKeyCorrect: () =>
		set((state) => ({ score: state.score + 1, gameState: '2/2' })),
	handleKeyIncorrect: () =>
		set((state) => ({
			gameState: 'INCORRECT_INPUT',
			incorrectInputs: state.incorrectInputs + 1
		})),
	handleResetKeyInput: () => set(() => ({ gameState: '0/2' })),
	handleAfterPlayerScored: () =>
		set((state) => ({
			gameState: '0/2',
			gameCurrentBuildingPrompt: returnRandomIndex(buildings)
		})),
	/**
	 * Handle game states
	 */
	handleGameStart: () =>
		set(() => ({
			isPlaying: true
		})),
	handleGameEnd: () =>
		set((state) => {
			const finishTime = currentTimeInSeconds()
			const numBuildings = state.scoreLimit
			const apm =
				Math.round(
					calcActionsPerMinute(
						finishTime - state.startTime,
						state.scoreLimit
					) * 100
				) / 100

			const correctInputs = state.scoreLimit * 2 // scoreLimit === num of buildings á 2 keys
			const accuracy = calcKeyAccuracy(
				state.incorrectInputs,
				correctInputs
			)
			const endResult = [
				{ type: 'Buildings', value: numBuildings },
				{ type: 'Buidlings / Minute', value: apm },
				{ type: 'Accuracy', value: accuracy }
			]
			return { score: 0, isPlaying: false, endResult }
		})
}))

export default useStore
