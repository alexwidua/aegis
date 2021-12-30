import { useEffect } from 'react'

function useEffectOnce(effect) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(effect, [])
}

export default useEffectOnce
