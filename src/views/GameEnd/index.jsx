/**
 * @file The GameEnd screen which shows result/stats and affords the player to play another round.
 */

import useStore from '@store'
import useBuilding from '../../hooks/useBuilding'
import Message from '@components/common/Message'
import { Table, TableRow, TableItem } from '@components/gameEnd/Table'
import { GameMenu, GameFooter } from '@views/shared'
import { MIN_BUILDING_TRESHOLD } from './constants'
import styles from './index.module.scss'

const GameEnd = () => {
	const { score, endResult } = useStore((state) => ({
		score: state.score,
		endResult: state.endResult
	}))
	const notEnoughData = score < MIN_BUILDING_TRESHOLD

	// Since we only get a endResult array with a bunch of objects, we first
	// take it apart to get the interesint pieces.Button

	// TODO: Add TypeScript to make this safe

	const numPlayedBuildings = {
		value: endResult[0].value,
		type: endResult[0].type
	}
	const apm = { value: endResult[1].value, type: endResult[1].type }
	const accuracy = { value: endResult[2].value, type: endResult[2].type }

	// The endResult array just supplies us with the fastest and slowest building name and time.
	// We get the corresponding icon and shortcut (for visual purposes) by using the custom useBuilding hook.
	const slowest = {
		name: endResult[3].value ? endResult[3].value[0] : 0,
		time: endResult[3].value ? endResult[3].value[1] : 0,
		type: endResult[3].type
	}
	const fastest = {
		name: endResult[4].value ? endResult[4].value[0] : 0,
		time: endResult[4].value ? endResult[4].value[1] : 0,
		type: endResult[4].type
	}
	const slowestBuildingWithIcon = useBuilding(slowest.name)
	const fastestBuildingWithIcon = useBuilding(fastest.name)

	return endResult ? (
		<div className={styles.container}>
			<h2 style={{ alignSelf: 'flex-start' }}>Your result</h2>
			<Table>
				{notEnoughData && (
					<Message>
						Stats require at least {MIN_BUILDING_TRESHOLD} played
						buildings.
					</Message>
				)}
				<TableRow>
					<TableItem
						value={numPlayedBuildings.value}
						label={numPlayedBuildings.type}
						disabled={notEnoughData}
					/>
					<TableItem
						value={notEnoughData ? 0 : apm.value}
						label={apm.type}
						disabled={notEnoughData}
					/>
					<TableItem
						value={notEnoughData ? 0 : accuracy.value}
						label={accuracy.type}
						unit={'%'}
						disabled={notEnoughData}
					/>
				</TableRow>
				<TableRow>
					<TableItem
						showBuilding={slowestBuildingWithIcon}
						value={slowest.time}
						label={slowest.type}
						disabled={notEnoughData}
						unit={'sec/avg'}
					/>
					<TableItem
						showBuilding={fastestBuildingWithIcon}
						value={fastest.time}
						label={fastest.type}
						disabled={notEnoughData}
						unit={'sec/avg'}
					/>
				</TableRow>
			</Table>
			<GameMenu />
			<GameFooter />
		</div>
	) : (
		<div style={{ padding: '4rem 0' }}>Couldn't fetch end result.</div>
	)
}

export default GameEnd
