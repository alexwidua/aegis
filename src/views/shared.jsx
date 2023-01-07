import useStore from '@store'
import { Button, ButtonRow } from '@components/common/Button'
import Footer from '@components/layout/Footer'

// Assets
import HRE from '@assets/icons/flags/hre.png'
import Wood from '@assets/icons/misc/wood.png'
import Gold from '@assets/icons/misc/gold.png'

const GameMenu = ({
	play = 'Start typing',
	playAgain = 'Play again',
	onPlay,
	options = 'Options'
}) => {
	const { setOptionsModalOpen, endResult, handleGameStart } = useStore(
		(state) => ({
			setOptionsModalOpen: state.setOptionsModalOpen,
			endResult: state.endResult,
			handleGameStart: state.handleGameStart
		})
	)
	return (
		<ButtonRow>
			<Button
				onClick={onPlay || handleGameStart}
				style={{ width: '60%' }}
				primary>
				{endResult ? playAgain : play}
			</Button>
			<Button
				onClick={() => setOptionsModalOpen(true)}
				style={{ width: '40%', position: 'relative' }}>
				{options}
			</Button>
		</ButtonRow>
	)
}

const GameFooter = () => {
	return (
		<Footer>
			<ul>
				<li>
					Created with <img src={Wood} alt={`Wood`} /> in{' '}
					<img src={HRE} alt={`Holy Roman Empire`} />{' '}
				</li>
				<li>
					<a href='https://github.com/alexwidua/aegis'>
						View on GitHub
					</a>
				</li>
				<li>
					<a href='https://ko-fi.com/alexwidua'>Send tribute</a>
					<img src={Gold} alt={`Gold`} />
				</li>
			</ul>
		</Footer>
	)
}

export { GameMenu, GameFooter }
