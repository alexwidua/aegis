/**
 * @file View before the game is started for the first time each session.
 * After the first playthrough, the player will bounce between the 'Game' and 'GameEnd' view,
 * so this view is only shown once every session/refresh.
 */

import { GameMenu, GameFooter } from '../shared'
import styles from './index.module.scss'

const TitleScreenView = () => {
	return (
		<div className={styles.container}>
			<h1>Aegis.</h1>
			<h2>A tiny game to practice AoE building shortcuts.</h2>
			<GameMenu />
			<GameFooter />
		</div>
	)
}

export default TitleScreenView
