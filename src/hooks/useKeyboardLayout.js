import { useState } from 'react'

function useCopyToClipboard() {
	const [copiedText, setCopiedText] = useState(null)

	const copy = async (text) => {
		if (!navigator?.keyboard) {
			console.warn('Clipboard not supported')
			return false
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			const keyboardLayout = await navigator.keyboard.getLayoutMap()
			setCopiedText(keyboardLayout)
			console.log(keyboardLayout)
			return keyboardLayout
		} catch (error) {
			console.warn('Copy failed', error)
			setCopiedText(null)
			return false
		}
	}

	return copy
}

export default useCopyToClipboard
