/**
 * @file ...
 */

import useStore from '../../store'
import styles from './keys.module.scss'
import { useGameState } from '../../hooks'

const Keys = () => {
	const { keyPressed, score, gameState, showKeyLabels } = useStore(
		(state) => ({
			keyPressed: state.keyPressed,
			score: state.score,
			gameState: state.gameState,
			showKeyLabels: state.showKeyLabels
		})
	)
	const { firstKey, secondKey, playerKeyIncorrect } = useGameState()
	const shortcuts = [firstKey, secondKey]
	const keyLabels =
		showKeyLabels === 'SHOW'
			? styles.labeled
			: showKeyLabels === 'FADE_IN'
			? 'fade-in'
			: null

	return (
		<div
			className={`${styles.keys} ${playerKeyIncorrect ? 'shake' : null}`}>
			{shortcuts.map((key, i) => (
				<div
					className={`
                      ${styles.key} ${
						gameState[0] >= i + 1 ? styles.correct : null
					} 
                      ${keyLabels}
                      ${
							keyPressed && parseInt(gameState[0]) === i + 1
								? styles.down
								: null
						}`}
					key={i + score.toFixed()}>
					{key}
				</div>
			))}
		</div>
	)
}

export default Keys
