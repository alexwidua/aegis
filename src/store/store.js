/**
 * @file Contains game states and some global UI states
 */

import create from 'zustand'
import buildings from '../assets/buildings'
import { currentTimeInSeconds } from '../utils/time'

import {
	calcActionsPerMinute,
	calcPercentageRemainder,
	calcArrayAvg,
	randArrayFrom,
	returnArrayAscending
} from '../utils/math'

import { filterBuildings } from '../utils/game'

// Default values on startup and prompt reset
const DEFAULT_GAME_STATE = '0/2'
const DEFAULT_TICK = 0
const DEFAULT_SCORE = 0
const DEFAULT_START_TIME = 0

//Keyboard defaults

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
	gameState: DEFAULT_GAME_STATE,
	recipe: null,
	tick: DEFAULT_TICK,
	score: DEFAULT_SCORE,
	startTime: DEFAULT_START_TIME,
	promptStartTime: 0,
	promptTimes: {},
	handleSetStartTime: () =>
		set(() => ({ startTime: currentTimeInSeconds() })),
	incorrectInputs: 0,

	/**
	 * Game settings
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
		civSpecific: true,
		group: 'GENERIC'
	},
	handleSetBuildingFilter: (value) =>
		set((state) => ({ buildingFilter: value })),
	showKeyLabels: 'FADE_IN',
	handleSetShowKey: (value) => set(() => ({ showKeyLabels: value })),
	keyMap: [
		['q', 'w', 'e', 'r'],
		['a', 's', 'd', 'f'],
		['y', 'x', 'c', 'v']
	],
	handleSetKeyMap: (column, row, value) =>
		set((state) => {
			const arr = state.keyMap
			arr[column][row] = value
			return {
				keyMap: arr
			}
		}),
	handleSetKeyMapDefault: (layout) =>
		set(() => {
			const KEY_MAP_DEFAULTS = {
				QWERTY: [
					['q', 'w', 'e', 'r'],
					['a', 's', 'd', 'f'],
					['y', 'x', 'c', 'v']
				],
				QWERTZ: [
					['q', 'w', 'e', 'r'],
					['a', 's', 'd', 'f'],
					['y', 'x', 'c', 'v']
				],
				AZERTY: [
					['a', 'z', 'e', 'r'],
					['q', 's', 'd', 'f'],
					['w', 'x', 'c', 'v']
				]
			}
			return { keyMap: KEY_MAP_DEFAULTS[layout] }
		}),

	/**
	 * Key events that occur during play
	 */
	handleFirstKeyCorrect: () => set(() => ({ gameState: '1/2' })),
	handleSecondKeyCorrect: () =>
		set((state) => {
			const temp = state.promptTimes
			const promptFinishTime =
				currentTimeInSeconds() - state.promptStartTime

			if (!temp[state.recipe[state.score].name]) {
				temp[state.recipe[state.score].name] = []
			}
			temp[state.recipe[state.score].name].push(promptFinishTime)

			return {
				score: state.score + 1,
				gameState: '2/2',
				promptTimes: temp
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
	 * Game cycle
	 */
	handleGameStart: () =>
		set((state) => {
			const filtered = filterBuildings(buildings, state.buildingFilter)
			const recipe = randArrayFrom(filtered, state.scoreLimit)
			const _newObj = {}
			return {
				gameState: DEFAULT_GAME_STATE,
				tick: DEFAULT_TICK,
				score: DEFAULT_SCORE,
				startTime: DEFAULT_START_TIME,
				promptStartTime: currentTimeInSeconds(),
				promptTimes: _newObj,
				isPlaying: true,
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
