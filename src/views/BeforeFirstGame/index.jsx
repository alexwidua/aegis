/**
 * @file Shows an initial message the first time the game is played.
 * Used to ask user for correct keyboard settings to improve the UX and avoid confusion.
 */

import { GameMenu } from '../shared'
import useStore from '@store'
import { useLocalStorage } from '@hooks'
import { deriveKeyboardLayout } from '@utils/keyboard'
import { LOCAL_STORAGE_KEY, KEYBOARD_DEFAULT_LAYOUTS } from '@store/constants'
import styles from './index.module.scss'

const BeforeFirstGame = () => {
	const { setShowBeforeFirstGame, keyboardLayout } = useStore((state) => ({
		setShowBeforeFirstGame: state.setShowBeforeFirstGame,
		keyboardLayout: state.keyboardLayout
	}))

	/**
	 * Write showBeforeFirstGame to local storage to hide the message for future sessions.
	 */
	const [localStorageOptions, setLocalStorageOptions] =
		useLocalStorage(LOCAL_STORAGE_KEY)

	const handleBeforeFirstGame = () => {
		setShowBeforeFirstGame(false)
		setLocalStorageOptions({
			showBeforeFirstGame: false,
			...localStorageOptions
		})
	}

	// Get current keyboard mapping
	const currentLayout = deriveKeyboardLayout(
		KEYBOARD_DEFAULT_LAYOUTS(),
		keyboardLayout
	)

	return (
		<div className={styles.container}>
			<div>
				<h2>
					The keyboard layout is set to{' '}
					<span>
						{currentLayout === 'NULL' ? 'Custom' : currentLayout}
					</span>
					, is that correct?
				</h2>
			</div>
			<GameMenu
				play={'Looks good!'}
				options={'Change layout'}
				onPlay={handleBeforeFirstGame}
			/>
		</div>
	)
}

export default BeforeFirstGame
