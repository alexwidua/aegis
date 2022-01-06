/**
 * @file Because the website is not usable on mobile devices, we show a conditional
 * screen that allows the visitor to email themselves the link -- for later use.
 */

import { useState } from 'react'
import { useWindowSize, useEffectOnce } from '@hooks/'
import styles from './index.module.scss'

const MOBILE_WIDTH = 769
const MAIL_SUBJECT = '[Reminder] Aegis, tiny game for AoE shortcuts'
const MAIL_BODY = 'https://www.aegis.lol/'

const ShowWarningOnMobileView = () => {
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

export default ShowWarningOnMobileView
