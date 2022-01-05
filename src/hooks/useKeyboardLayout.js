/**
 * @file Returns a KeyboardLayoutMap, if feature is supported by browser.
 * https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/getLayoutMap
 */

import { useState, useEffect } from 'react'

function useKeyboardLayout() {
	const [keyboardLayout, setKeyboardLayout] = useState(null)

	useEffect(() => {
		const detectLayout = async () => {
			if (!navigator?.keyboard) {
				console.warn(
					`Couldn't detect keyboard layout because your browser doesn't support this (experimental) feature.`
				)
				return false
			}

			try {
				const keyboardLayout = await navigator.keyboard.getLayoutMap()
				setKeyboardLayout(keyboardLayout)
				return keyboardLayout
			} catch (error) {
				console.warn(`Couldn't get keyboard layout`, error)
				setKeyboardLayout(null)
				return false
			}
		}

		detectLayout()
	}, [])

	return keyboardLayout
}

export default useKeyboardLayout
