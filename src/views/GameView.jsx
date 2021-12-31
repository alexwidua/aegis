/**
 * @file Contains the core game view
 */

import useStore from '../store/store'
import styles from './game.module.scss'
import { useGameState, useEffectOnce } from '../hooks/'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Button from '../components/ui/Button'

/**
 * Default game view. Props take presedence, this is used to display the game preview in the OptionsView component.
 */
const GameView = () => {
	const { recipe, score, scoreLimit, promptStyle, handleGameEnd } = useStore(
		(state) => ({
			recipe: state.recipe,
			score: state.score,
			scoreLimit: state.scoreLimit,
			promptStyle: state.promptStyle,
			handleGameEnd: state.handleGameEnd,
			currentBuilding: state.recipe ? state.recipe[state.score] : null,
			currentA: state.recipe ? state.recipe[state.tick] : null
		})
	)
	const {
		firstKey,
		secondKey,
		keyPosition,
		building,
		playerKeyIncorrect,
		playerSecondKeyCorrect
	} = useGameState()

	// Preload all icons to avoid flash of unloaded images
	// TODO: Get rid of preload
	useEffectOnce(() => {
		const interval = setInterval(() => {
			recipe.forEach((img) => {
				new Image().src = img.icon
			})
		}, 1000)
		return () => clearInterval(interval)
	})

	return recipe ? (
		<>
			<div
				className={`
				${styles.container} 
				${playerSecondKeyCorrect ? 'scored' : null} 
				${promptStyle === 'GRID' ? styles['container-grid-style'] : null}`}>
				{promptStyle === 'SINGLE' ? (
					<PromptSingleView
						name={building.preemptive?.name || ''}
						icon={building.preemptive?.icon || ''}
						type={building.preemptive?.type || ''}
					/>
				) : (
					<PromptGridView
						icon={building.current?.icon || ''}
						firstKeyPosition={keyPosition.current?.firstKey || ''}
						secondKeyPosition={keyPosition.current?.secondKey || ''}
						type={building.current?.type || ''}
					/>
				)}
				<Keys
					firstKey={firstKey}
					secondKey={secondKey}
					playerKeyIncorrect={playerKeyIncorrect}
				/>
			</div>
			<div className={'footer'}>
				<Score score={score} scoreLimit={scoreLimit} />
				<Button onClick={handleGameEnd} tertiary>
					End game
				</Button>
			</div>
		</>
	) : (
		<div
			className={styles['click-anywhere']}
			onClick={() => handleGameEnd()}>
			<h3>No building selected 👀</h3>
			<br />
			<p>Click anywhere to end this session and change your settings.</p>
		</div>
	)
}

/**
 * Displays the current score and scorelimit (-> indicate how many buildings are left)
 */
const Score = ({ score, scoreLimit }) => {
	return (
		<span
			className={styles.score}
			dangerouslySetInnerHTML={{ __html: `${score} / ${scoreLimit}` }}
		/>
	)
}

/**
 * Displays the current building icon and name, depending on what
 * view is set in the options menu (default: Single)
 */
const PromptSingleView = ({ name, icon, type }) => {
	const score = useStore((state) => state.score)

	return (
		<>
			<TransitionGroup>
				<CSSTransition key={score} timeout={300} classNames="slide">
					<div
						className={`
				${styles['icon-container']}
				${styles[type]}
				`}>
						{icon && (
							<img
								className={styles.icon}
								src={icon}
								alt={name + ' icon'}
							/>
						)}
					</div>
				</CSSTransition>
			</TransitionGroup>
			<TransitionGroup>
				<CSSTransition key={score} timeout={300} classNames="fade">
					<div className={styles.name}>{name}</div>
				</CSSTransition>
			</TransitionGroup>
		</>
	)
}

const PromptGridView = ({
	name,
	icon,
	type,
	firstKeyPosition,
	secondKeyPosition
}) => {
	const { keyMap } = useStore((state) => ({
		keyMap: state.keyMap
	}))
	const { playerSecondKeyCorrect } = useGameState()
	const ages = [0, 1, 2, 3]

	return (
		<div className={styles.grid}>
			{ages.map((el, age) => {
				const isAge = parseInt(firstKeyPosition[1]) === age
				return (
					<div className={styles.ages}>
						{keyMap.map((el, row) => {
							return (
								<div className={styles.row} key={row}>
									{el.map((el, col) => {
										const isKey =
											isAge &&
											parseInt(secondKeyPosition[0]) ===
												row &&
											parseInt(secondKeyPosition[1]) ===
												col

										return col < 4 - age ? (
											<span
												className={`${styles.column} ${
													isKey
														? styles.visible
														: null
												}
												${styles[type]}
												${playerSecondKeyCorrect && isKey ? styles.scored : null}`}
												key={col + 'i'}>
												{isKey && (
													<img
														className={`${styles.icon}`}
														src={icon}
														alt={name + ' icon'}
													/>
												)}
											</span>
										) : null
									})}
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

/**
 * Displays the key indicators
 */
const Keys = ({ firstKey, secondKey, playerKeyIncorrect }) => {
	const { keyPressed, score, gameState, showKeyLabels } = useStore(
		(state) => ({
			keyPressed: state.keyPressed,
			score: state.score,
			gameState: state.gameState,
			showKeyLabels: state.showKeyLabels
		})
	)

	const hotkeys = [firstKey, secondKey]

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
					${keyPressed && parseInt(gameState[0]) === i + 1 ? styles.down : null}`}
					key={i + score.toFixed()}>
					{key}
				</div>
			))}
		</div>
	)
}

export default GameView
