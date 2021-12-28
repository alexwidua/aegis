/**
 * @file Contains the core game view
 */

import useStore from '../store/store'
import styles from './game.module.scss'
import useGameState from '../hooks/useGameState'
import useKeyPress from '../hooks/useKeyPress'

/**
 * Default game view. Props take presedence, this is used to display the game preview in the OptionsView component.
 */
const GameView = ({ name, icon, hotkeys }) => {
	const { playerSecondKeyCorrect } = useGameState()
	return (
		<div
			className={`${styles.container} ${
				playerSecondKeyCorrect ? 'scored' : null
			}`}>
			{!name && !icon && !hotkeys && <Score />}
			<Prompt name={name} icon={icon} />
			<Keys hotkeys={hotkeys} />
		</div>
	)
}

const Score = () => {
	const { score, scoreLimit } = useStore((state) => ({
		score: state.score,
		scoreLimit: state.scoreLimit
	}))

	return (
		<div className={styles.score}>
			<span
				className={styles['score-primary']}
				dangerouslySetInnerHTML={{ __html: score }}
			/>
			<span dangerouslySetInnerHTML={{ __html: '&nbsp;/&nbsp;' }} />
			<span dangerouslySetInnerHTML={{ __html: scoreLimit }} />
		</div>
	)
}

const Prompt = (props) => {
	const { _name, _icon } = useStore((state) => ({
		_name: state.gameCurrentBuildingPrompt.name,
		_icon: state.gameCurrentBuildingPrompt.icon
	}))

	const name = props.name || _name
	const icon = props.icon || _icon

	return (
		<div className={styles['building-column']}>
			<div
				className={`
				${styles['icon-container']}
				`}>
				<img className={styles.icon} src={icon} />
			</div>
			<div className={styles.name}>{name}</div>
		</div>
	)
}

const Keys = (props) => {
	const { keyPressed, score, gameState, _hotkeys, showKeyLabels } = useStore(
		(state) => ({
			keyPressed: state.keyPressed,
			score: state.score,
			gameState: state.gameState,
			_hotkeys: state.gameCurrentBuildingPrompt.hotkeys,
			showKeyLabels: state.showKeyLabels
		})
	)
	const { playerKeyIncorrect } = useGameState()

	const keyLabels =
		showKeyLabels === 'SHOW'
			? styles.labeled
			: showKeyLabels === 'FADE_IN'
			? 'fade-in'
			: null

	const hotkeys = props.hotkeys || _hotkeys

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
