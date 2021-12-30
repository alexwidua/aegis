/**
 * @file App, collects all views
 */
import { useState, useEffect } from 'react'
import styles from './app.module.scss'

import useStore from './store/store'
import useGameLogic from './game/useGameLogic'
import {
	useGameState,
	useLocalStorage,
	useWindowSize,
	useEffectOnce
} from './hooks/'

import { InitialView, GameView, ResultView, OptionsView } from './views'
import Modal from 'react-modal'
import ModalWindow from './components/Modal'
import Button from './components/ui/Button'

import HRE from './assets/images/hre.png'
import Wood from './assets/images/wood.png'
import Gold from './assets/images/gold.png'

const MOBILE_WIDTH = 769
Modal.setAppElement('#root')

const App = () => {
	/**
	 * Game-related states
	 */
	useGameLogic()
	const { isPlaying, endResult, handleGameStart } = useStore((state) => ({
		isPlaying: state.isPlaying,
		endResult: state.endResult,
		handleGameStart: state.handleGameStart
	}))
	const { gameEnded, playerSecondKeyCorrect } = useGameState()

	/**
	 * UI states
	 */
	const [optionsModal, setOptionsModal] = useState(false)
	const [showMobileOnlyMsg, setShowMobileOnlyMsg] = useState(false)
	const { width } = useWindowSize()

	/**
	 * Local storage
	 */
	const {
		updateGameSettingsFromLocalStorage,
		scoreLimit,
		buildingFilter,
		showKeyLabels,
		keyboardLayout
	} = useStore((state) => ({
		updateGameSettingsFromLocalStorage:
			state.updateGameSettingsFromLocalStorage,
		scoreLimit: state.scoreLimit,
		buildingFilter: state.buildingFilter,
		showKeyLabels: state.showKeyLabels,
		keyboardLayout: state.keyboardLayout
	}))
	const [localStorageOptions, setLocalStorageOptions] = useLocalStorage(
		'aoe-shortcuts-v030',
		''
	)
	const gameOptions = {
		scoreLimit,
		buildingFilter,
		showKeyLabels,
		keyboardLayout
	}
	useEffectOnce(() => {
		if (!localStorageOptions) {
			setLocalStorageOptions(gameOptions)
		} else {
			updateGameSettingsFromLocalStorage(localStorageOptions)
		}
	})

	useEffectOnce(() => {
		if (width < MOBILE_WIDTH) setShowMobileOnlyMsg(true)
		console.log(width)
	})

	// Sync data to local storage on modal close
	useEffect(() => {
		if (!optionsModal) setLocalStorageOptions(gameOptions)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [optionsModal])

	return (
		<div
			className={`${styles.wrapper} ${
				playerSecondKeyCorrect ? styles.scored : null
			}`}>
			<div className={styles.container}>
				{isPlaying && !gameEnded ? (
					<GameView />
				) : !isPlaying && gameEnded ? (
					<ResultView />
				) : endResult ? (
					<ResultView />
				) : (
					<InitialView />
				)}
				{!isPlaying && (
					<div className={styles['button-row']}>
						<Button
							onClick={handleGameStart}
							style={{ minWidth: '12rem' }}
							primary>
							{endResult ? 'Play again' : `Start typin'`}
						</Button>
						<Button onClick={() => setOptionsModal(true)}>
							Options
						</Button>
					</div>
				)}
			</div>
			{!isPlaying && <Footer />}
			<ModalWindow
				isOpen={optionsModal}
				onRequestClose={() => setOptionsModal(false)}>
				<OptionsView />
			</ModalWindow>
			{showMobileOnlyMsg && (
				<DisplayMessageOnMobileOnly
					onDiscardMessage={() => setShowMobileOnlyMsg(false)}
				/>
			)}
		</div>
	)
}

const Footer = () => {
	return (
		<footer className={`footer`}>
			<ul>
				<li>
					Created with <img src={Wood} alt={`Wood`} /> in{' '}
					<img src={HRE} alt={`Holy Roman Empire`} />{' '}
				</li>
				<li>
					<a href="https://github.com/alexwidua/aoe-shortcuts">
						View on GitHub
					</a>
				</li>
				<li>
					<a href="https://ko-fi.com/alexwidua">Send tribute</a>
					<img src={Gold} alt={`Gold`} />
				</li>
			</ul>
		</footer>
	)
}

/**
 * Show mobile users a message.
 */
const MAIL_SUBJECT = '[Reminder] Aegis, tiny game for AoE shortcuts'
const MAIL_BODY = 'https://www.aegis.lol/'
const DisplayMessageOnMobileOnly = ({ onDiscardMessage }) => {
	return (
		<div className={styles['mobile-only']}>
			<h2>
				Aegis is a typing game that requires keyboard input and doesn't
				work on mobile devices.
			</h2>
			<div>
				<a href={`mailto:?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`}>
					📧 Email yourself this link for later
				</a>
				<button onClick={onDiscardMessage}>Show game anyway</button>
			</div>
		</div>
	)
}

export default App
