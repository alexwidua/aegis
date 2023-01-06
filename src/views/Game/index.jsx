/**
 * @file THe main game view, which shows the actual game during play.
 */

import useStore from '@store'
import { IconSingle, IconGrid, IconName, Keys, Score } from '@components/game/'
import { Button } from '@components/common/Button'
import styles from './index.module.scss'

const GameView = () => {
	const { recipe, score, scoreLimit, iconDisplayStyle, handleGameEnd } =
		useStore((state) => ({
			recipe: state.recipe,
			score: state.score,
			scoreLimit: state.scoreLimit,
			iconDisplayStyle: state.iconDisplayStyle,
			handleGameEnd: state.handleGameEnd,
			currentBuilding: state.recipe ? state.recipe[state.score] : null,
			currentA: state.recipe ? state.recipe[state.tick] : null
		}))
	const useGrid = iconDisplayStyle === 'GRID'
	return recipe ? (
		<div className={styles.container}>
			<div
				className={`
					${styles.game}
					${useGrid ? styles.grid : null}`}>
				{useGrid ? <IconGrid /> : iconDisplayStyle === 'NAME' ? <IconName /> : <IconSingle />}
				<Keys />
			</div>
			<div className={styles.bottom}>
				<Score score={score} scoreLimit={scoreLimit} />
				<Button onClick={handleGameEnd} tertiary>
					End game
				</Button>
			</div>
		</div>
	) : (
		// Catch error if user hasn't selected any building
		// by selecting neither any age nor type.
		<div className={styles.error} onClick={() => handleGameEnd()}>
			<h3>No building selected 👀</h3>
			<p>Click anywhere to end this session and change your settings.</p>
		</div>
	)
}

export default GameView
