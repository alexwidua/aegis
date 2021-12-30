import { useLayoutEffect, useEffect, useState, useRef } from 'react'

function useEventListener(
	eventName, // string to allow custom event
	handler,
	element
) {
	// Create a ref that stores handler
	const savedHandler = useRef()

	useEffect(() => {
		// Define the listening target
		const targetElement = element?.current || window
		if (!(targetElement && targetElement.addEventListener)) {
			return
		}

		// Update saved handler if necessary
		if (savedHandler.current !== handler) {
			savedHandler.current = handler
		}

		// Create event listener that calls handler function stored in ref
		const eventListener = (event) => {
			// eslint-disable-next-line no-extra-boolean-cast
			if (!!savedHandler?.current) {
				savedHandler.current(event)
			}
		}

		targetElement.addEventListener(eventName, eventListener)

		// Remove event listener on cleanup
		return () => {
			targetElement.removeEventListener(eventName, eventListener)
		}
	}, [eventName, element, handler])
}

function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0
	})

	const handleSize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight
		})
	}

	useEventListener('resize', handleSize)

	// Set size at the first client-side load
	useLayoutEffect(() => {
		handleSize()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return windowSize
}

export default useWindowSize
