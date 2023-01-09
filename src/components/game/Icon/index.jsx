/**
 * @file TODO: Remove state from component and pass down as prop.
 */

import useStore from '@store'
import { useGameState } from '@hooks'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styles from './icon.module.scss'

const IconSingle = () => {
	const score = useStore((state) => state.score)
	const { building } = useGameState()
	const { name, icon, type } = building?.preemptive || {}

	return (
		<>
			<TransitionGroup>
				<CSSTransition key={score} timeout={300} classNames='slide'>
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
				<CSSTransition key={score} timeout={300} classNames='fade'>
					<div className={styles.name}>{name}</div>
				</CSSTransition>
			</TransitionGroup>
		</>
	)
}

const IconGrid = () => {
	const { keyboardLayout } = useStore((state) => ({
		keyboardLayout: state.keyboardLayout
	}))
	const { building, keyPosition, playerSecondKeyCorrect } = useGameState()

	const firstKeyPosition = keyPosition.current?.firstKey || ''
	const secondKeyPosition = keyPosition.current?.secondKey || ''
	const { name, icon, type } = building?.current || {}
	const ages = [0, 1, 2, 3]

	return (
		<div className={styles.grid}>
			{ages.map((el, age) => {
				const isAge = parseInt(firstKeyPosition[1]) === age
				return (
					<div className={styles.ages} key={age}>
						{keyboardLayout.map((el, row) => {
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
                                                 ${
														playerSecondKeyCorrect &&
														isKey
															? styles.scored
															: null
													}`}
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

const IconName = () => {
	const { building } = useGameState()
	const { name } = building?.preemptive || {}

	return <div className={styles.nameOnly}>{name}</div>
}

export { IconSingle, IconGrid, IconName }
