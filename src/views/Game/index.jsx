/**
 * @file ...
 */

import useStore from '../../store'
import styles from './index.module.scss'
import { IconSingle, IconGrid } from './Icon'
import Keys from './Keys'
import Button from '../../components/Button'
import Score from './Score'

const Game = () => {
	const { recipe, score, scoreLimit, iconStyle, handleGameEnd } = useStore(
		(state) => ({
			recipe: state.recipe,
			score: state.score,
			scoreLimit: state.scoreLimit,
			iconStyle: state.iconStyle,
			handleGameEnd: state.handleGameEnd,
			currentBuilding: state.recipe ? state.recipe[state.score] : null,
			currentA: state.recipe ? state.recipe[state.tick] : null
		})
	)

	return recipe ? (
		<>
			<div
				className={`
                 ${styles.container} 
                 ${
						iconStyle === 'GRID'
							? styles['container-grid-style']
							: null
					}`}>
				{iconStyle === 'SINGLE' ? <IconSingle /> : <IconGrid />}
				<Keys />
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

export default Game
