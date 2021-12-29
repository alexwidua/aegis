const calcActionsPerMinute = (seconds, actions) => {
	const aps = (actions + 1) / seconds
	return aps * 60
}

const calcKeyAccuracy = (a, b) => {
	return 100 - (100 * a) / b
}

const returnRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)]
}

const randArrayFrom = (arr, length) => {
	if (!arr.length) return undefined
	return [...Array(length)].map(
		(_) => arr[Math.floor(Math.random() * arr.length)]
	)
}

export {
	calcActionsPerMinute,
	calcKeyAccuracy,
	returnRandomIndex,
	randArrayFrom
}
