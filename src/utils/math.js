const calcActionsPerMinute = (seconds, actions) => {
	const aps = (actions + 1) / seconds
	return aps * 60
}

const calcPercentage = (a, b) => {
	return (100 * a) / b
}

const calcPercentageRemainder = (a, b) => {
	return 100 - (100 * a) / b
}

const calcArrayAvg = (arr) => {
	const sum = arr.reduce((a, b) => a + b, 0)
	return sum / arr.length || 0
}

const returnRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)]
}

const returnArrayAscending = (arr) => {
	return arr.sort((a, b) => a[1] - b[1])
}

const randArrayFrom = (arr, length) => {
	if (!arr.length) return undefined
	return [...Array(length)].map(
		(_) => arr[Math.floor(Math.random() * arr.length)]
	)
}

export {
	calcActionsPerMinute,
	calcPercentage,
	calcPercentageRemainder,
	calcArrayAvg,
	returnRandomIndex,
	returnArrayAscending,
	randArrayFrom
}
