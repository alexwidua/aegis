import useStore from '../../store'
import { useGameState } from '../../hooks'
import styles from './index.module.scss'
import Button from '../../components/Button'
import ButtonRow from '../../components/Button/Row'

const LandingPage = () => {
	const { setOptionsModalOpen, isPlaying, endResult, handleGameStart } =
		useStore((state) => ({
			setOptionsModalOpen: state.setOptionsModalOpen,
			isPlaying: state.isPlaying,
			endResult: state.endResult,
			handleGameStart: state.handleGameStart
		}))

	return (
		<div className={styles.container}>
			<h1>Aegis.</h1>
			<h2>A tiny game to practice AoE building shortcuts.</h2>
			{!isPlaying && (
				<ButtonRow>
					<Button
						onClick={handleGameStart}
						style={{ minWidth: '12rem' }}
						primary>
						{endResult ? 'Play again' : `Start typin'`}
					</Button>
					<Button
						onClick={() => setOptionsModalOpen(true)}
						style={{ position: 'relative' }}>
						Options
					</Button>
				</ButtonRow>
			)}
		</div>
	)
}

export default LandingPage
