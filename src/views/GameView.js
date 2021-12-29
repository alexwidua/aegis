/**
 * @file Contains the core game view
 */

import useStore from '../store/store'
import styles from './game.module.scss'
import useGameState from '../hooks/useGameState'

/**
 * Default game view. Props take presedence, this is used to display the game preview in the OptionsView component.
 */
const GameView = () => {
	const recipe = useStore((state) => state.recipe)
	const { playerSecondKeyCorrect } = useGameState()

	return recipe ? (
		<div
			className={`${styles.container} ${
				playerSecondKeyCorrect ? 'scored' : null
			}`}>
			<Score />
			<Prompt />
			<Keys />
		</div>
	) : (
		<div> nothin here mate</div>
	)
}

/**
 * Displays the current score and scorelimit (-> indicate how many buildings are left)
 */
const Score = () => {
	const { score, scoreLimit } = useStore((state) => ({
		score: state.score,
		scoreLimit: state.scoreLimit
	}))

	const gridColumns = scoreLimit === 25 ? 5 : scoreLimit === 50 ? 10 : 20

	return (
		<div
			className={styles.score}
			style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
			{[...Array(scoreLimit)].map((_, i) => (
				<span
					className={`${styles['score-item']} ${
						score >= i + 1 ? styles.cleared : null
					}`}
					key={i}
				/>
			))}
		</div>
	)
}

/**
 * Displays the current building prompt
 */
const Prompt = (props) => {
	const { currentBuilding } = useGameState()
	const { type } = currentBuilding || ''

	const name = props.name || currentBuilding.name
	const icon = props.icon || currentBuilding.icon

	return (
		<div className={styles['building-column']}>
			<div
				className={`
				${styles['icon-container']}
				${styles[type]}
				`}>
				<img className={styles.icon} src={icon} alt={name + ' icon'} />
			</div>
			<div className={styles.name}>{name}</div>
		</div>
	)
}

/**
 * Displays the key indicators
 */
const Keys = (props) => {
	const { keyPressed, score, gameState, showKeyLabels } = useStore(
		(state) => ({
			keyPressed: state.keyPressed,
			score: state.score,
			gameState: state.gameState,
			showKeyLabels: state.showKeyLabels
		})
	)
	const { firstKey, secondKey, playerKeyIncorrect } = useGameState()
	const hotkeys = props.hotkeys || [firstKey, secondKey]

	const keyLabels =
		showKeyLabels === 'SHOW'
			? styles.labeled
			: showKeyLabels === 'FADE_IN'
			? 'fade-in'
			: null

	return (
		<div
			className={`${styles.keys} ${playerKeyIncorrect ? 'shake' : null}`}>
			{hotkeys.map((key, i) => (
				<div
					className={`
					${styles.key} ${gameState[0] >= i + 1 ? styles.correct : null} 
					${keyLabels}
					${keyPressed && gameState[0] == i + 1 ? styles.down : null}`}
					key={i + score.toFixed()}>
					{key}
				</div>
			))}
		</div>
	)
}

export default GameView
