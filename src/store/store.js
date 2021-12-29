/**
 * @file Contains game states and some global UI states
 */

import create from 'zustand'
import buildings from '../assets/buildings'
import { currentTimeInSeconds } from '../utils/time'

import {
	calcActionsPerMinute,
	calcPercentageRemainder,
	randArrayFrom
} from '../utils/math'
import { filterBuildings } from '../utils/game'

const useStore = create((set) => ({
	/**
	 * Global UI states
	 */
	keyPressed: false,
	handleKeyPressed: (value) => set(() => ({ keyPressed: value })),

	/**
	 * Interactive game states
	 */
	isPlaying: false,
	gameState: '0/2',
	recipe: null,
	score: 0,
	startTime: 0,
	handleSetStartTime: () =>
		set(() => ({ startTime: currentTimeInSeconds() })),
	incorrectInputs: 0,

	/**
	 * Game settings
	 */
	scoreLimit: 3,
	handleSetScoreLimit: (value) => set(() => ({ scoreLimit: value })),
	buildingFilter: {
		types: { economic: true, military: true, fort: true, research: true },
		ages: { I: true, II: true, III: true, IV: true },
		civSpecific: true
	},
	handleSetBuildingFilter: (value) =>
		set((state) => ({ buildingFilter: value })),
	showKeyLabels: 'SHOW',
	handleSetShowKey: (value) => set(() => ({ showKeyLabels: value })),
	keyboardLayout: 'qwertz',
	handleSetKeyboardLayout: (value) => set(() => ({ keyboardLayout: value })),

	/**
	 * Key events that occur during play
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
		set(() => {
			return { gameState: '0/2' }
		}),

	/**
	 * Game cycle
	 */
	handleGameStart: () =>
		set((state) => {
			const filtered = filterBuildings(buildings, state.buildingFilter)
			const recipe = randArrayFrom(filtered, state.scoreLimit)
			return {
				gameState: '0/2',
				score: 0,
				startTime: 0,
				isPlaying: true,
				recipe
			}
		}),
	handleGameEnd: () =>
		set((state) => {
			const finishTime = currentTimeInSeconds()
			const numBuildings = state.score
			const apm =
				Math.round(
					calcActionsPerMinute(
						finishTime - state.startTime,
						state.scoreLimit
					) * 100
				) / 100

			const correctInputs = state.scoreLimit * 2 // scoreLimit === num of buildings á 2 keys
			const accuracy = calcPercentageRemainder(
				state.incorrectInputs,
				correctInputs
			)
			const endResult = [
				{ type: 'buildings', value: numBuildings },
				{ type: 'buildings / minute', value: apm },
				{ type: 'accuracy', value: accuracy }
			]
			return {
				isPlaying: false,
				endResult
			}
		}),

	/**
	 * Misc
	 */
	endResult: null
}))

export default useStore
