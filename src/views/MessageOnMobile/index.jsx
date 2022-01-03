import { useState } from 'react'
import { useWindowSize, useEffectOnce } from '../../hooks/'
import styles from './index.module.scss'

/**
 * When user visits on a mobile device, show a message with a link
 * to send the website link as email for later use
 */
const MOBILE_WIDTH = 769
const MAIL_SUBJECT = '[Reminder] Aegis, tiny game for AoE shortcuts'
const MAIL_BODY = 'https://www.aegis.lol/'

const MessageOnMobile = ({ children }) => {
	const [showMobileOnlyMsg, setShowMobileOnlyMsg] = useState(false)
	const { width } = useWindowSize()
	useEffectOnce(() => {
		if (width < MOBILE_WIDTH) setShowMobileOnlyMsg(true)
	})

	return showMobileOnlyMsg ? (
		<div className={styles.container}>
			<h2>
				Aegis is a typing game that requires keyboard input and doesn't
				work on mobile devices.
			</h2>
			<div>
				<a href={`mailto:?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`}>
					📧 Email yourself this link for later
				</a>
				<button onClick={() => setShowMobileOnlyMsg(false)}>
					Show game anyway
				</button>
			</div>
		</div>
	) : null
}

export default MessageOnMobile
