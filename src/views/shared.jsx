import useStore from '@store'
import { Button, ButtonRow } from '@components/common/Button'
import Footer from '@components/layout/Footer'

// Assets
import HRE from '@assets/icons/flags/hre.png'
import Wood from '@assets/icons/misc/wood.png'
import Gold from '@assets/icons/misc/gold.png'

const GameMenu = () => {
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
					<a href="https://github.com/alexwidua/aegis">
						View on GitHub
					</a>
				</li>
				<li>
					<a href="https://ko-fi.com/alexwidua">Send tribute</a>
					<img src={Gold} alt={`Gold`} />
				</li>
			</ul>
		</Footer>
	)
}

export { GameMenu, GameFooter }
