/**
 * @file Hook to handle keydown events
 */
import { useState, useEffect } from 'react'

const useKeyPress = (callback) => {
	const [keyPressed, setKeyPressed] = useState()

	useEffect(() => {
		const handleKeyDown = ({ key }) => {
			if (keyPressed !== key && key.length === 1) {
				setKeyPressed(key)
				callback && callback(key)
			}
		}
		const handleKeyUp = () => {
			setKeyPressed(null)
		}
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	})
	return keyPressed
}

export default useKeyPress
