/**
 * Checks if customLayout matches any of the provided default layouts.
 */
const deriveKeyboardLayout = (defaultLayouts, customLayout) => {
	if (!defaultLayouts) return null
	return Object.keys(defaultLayouts).find(
		(key) =>
			JSON.stringify(defaultLayouts[key]) === JSON.stringify(customLayout)
	)
}

export { deriveKeyboardLayout }
