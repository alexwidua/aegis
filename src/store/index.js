/**
 * @file Contains game states and some global UI states
 */

import create from 'zustand'
import buildings from '../assets/buildings'
import {
	calcActionsPerMinute,
	calcPercentageRemainder,
	calcArrayAvg,
	randArrayFrom,
	returnArrayAscending
} from '../utils/math'
import { currentTimeInSeconds } from '../utils/time'
import { filterBuildings } from '../utils/game'

const useStore = create((set) => ({
	/**
	 * Global UI states
	 */
	optionsModalOpen: false,
	setOptionsModalOpen: (value) => set(() => ({ optionsModalOpen: value })),
	keyPressed: false,
	handleKeyPressed: (value) => set(() => ({ keyPressed: value })),

	/**
	 * Interactive game states
	 */
	tickPreemptive: 0,
	tick: 0,
	isPlaying: false,
	gameState: '0/2',
	recipe: null,
	score: 0,
	startTime: 0,
	promptStartTime: 0,
	promptTimes: {},
	handleSetStartTime: () =>
		set(() => ({ startTime: currentTimeInSeconds() })),
	incorrectInputs: 0,

	/**
	 * Game options.
	 * These values are exposed and set via the options modal.
	 */
	updateGameSettingsFromLocalStorage: (value) => set(() => value),
	scoreLimit: 25,
	handleSetScoreLimit: (value) => set(() => ({ scoreLimit: value })),
	buildingFilter: {
		types: {
			economic: true,
			military: false,
			fortified: false,
			research: false
		},
		ages: { I: true, II: false, III: false, IV: false },
		group: 'GENERIC'
	},
	handleSetBuildingFilter: (value) => set(() => ({ buildingFilter: value })),
	iconStyle: 'SINGLE',
	handleSetPromptStyle: (value) => set(() => ({ iconStyle: value })),
	showKeyLabels: 'FADE_IN',
	handleSetShowKey: (value) => set(() => ({ showKeyLabels: value })),
	keyMap: [
		['q', 'w', 'e', 'r'],
		['a', 's', 'd', 'f'],
		['y', 'x', 'c', 'v']
	],
	handleSetKeyMap: (column, row, value) =>
		set((state) => {
			const arr = [...state.keyMap]
			arr[column][row] = value
			return {
				keyMap: arr
			}
		}),
	handleSetKeyMapDefault: (layout) =>
		set(() => {
			return { keyMap: layout }
		}),

	/**
	 * Handle events that progress the game
	 */
	handleFirstKeyCorrect: () => set(() => ({ gameState: '1/2' })),
	handleSecondKeyCorrect: () =>
		set((state) => {
			// Add input time for each buidling to later calc average
			const prevTimes = state.promptTimes
			const promptFinishTime =
				currentTimeInSeconds() - state.promptStartTime
			if (!prevTimes[state.recipe[state.score].name]) {
				prevTimes[state.recipe[state.score].name] = []
			}
			prevTimes[state.recipe[state.score].name].push(promptFinishTime)

			return {
				tickPreemptive: state.tickPreemptive + 1,
				score: state.score + 1,
				gameState: '2/2',
				promptTimes: prevTimes
			}
		}),
	handleKeyIncorrect: () =>
		set((state) => ({
			gameState: 'INCORRECT_INPUT',
			incorrectInputs: state.incorrectInputs + 1
		})),
	handleResetKeyInput: () => set(() => ({ gameState: '0/2' })),
	handleAfterPlayerScored: () =>
		set((state) => {
			return {
				gameState: '0/2',
				tick: state.tick + 1,
				promptStartTime: currentTimeInSeconds()
			}
		}),

	/**
	 * Handle game (re-)start and game end
	 */
	handleGameStart: () =>
		set((state) => {
			const filtered = filterBuildings(buildings, state.buildingFilter)
			const recipe = randArrayFrom(filtered, state.scoreLimit)
			const _emptyObj = {} // to avoid state merging and start with empty obj
			return {
				tickPreemptive: 0,
				tick: 0,
				gameState: '0/2',
				score: 0,
				startTime: 0,
				promptStartTime: currentTimeInSeconds(),
				promptTimes: _emptyObj,
				isPlaying: true,
				incorrectInputs: 0,
				recipe
			}
		}),
	handleGameEnd: () =>
		set((state) => {
			const finishTime = currentTimeInSeconds()
			const numBuildings = state.score
			const apm = Math.round(
				calcActionsPerMinute(
					finishTime - state.startTime,
					state.scoreLimit
				)
			)

			const correctInputs = state.scoreLimit * 2 // scoreLimit === num of buildings á 2 keys
			const accuracy = calcPercentageRemainder(
				state.incorrectInputs,
				correctInputs
			)

			const buildingsAverageTime = Object.keys(state.promptTimes).map(
				(el) => {
					return [el, calcArrayAvg(state.promptTimes[el])]
				}
			)
			const sorted = returnArrayAscending(buildingsAverageTime)

			const fastestBuilding = sorted[0]
			const slowestBuilding = sorted[sorted.length - 1]

			const endResult = [
				{ type: 'buildings', value: numBuildings },
				{ type: 'actions per minute', value: apm },
				{ type: 'accuracy', value: accuracy },
				{ type: 'fastest building', value: fastestBuilding },
				{ type: 'slowest building', value: slowestBuilding }
			]

			return {
				gameState: 'GAME_ENDED',
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
