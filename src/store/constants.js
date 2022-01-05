// Key used to store settings in local storage
// Changing the key will 'erase' all local user stored preference
export const LOCAL_STORAGE_KEY = 'aoe-shortcuts-v060'

// Treshold before displaying game stats after game ended.
export const MIN_BUILDING_TRESHOLD = 15

// Export as func to avoid mutation.
// TODO: Fix this?
export const KEYBOARD_DEFAULT_LAYOUTS = () => ({
	QWERTY: [
		['q', 'w', 'e', 'r'],
		['a', 's', 'd', 'f'],
		['z', 'x', 'c', 'v']
	],
	QWERTZ: [
		['q', 'w', 'e', 'r'],
		['a', 's', 'd', 'f'],
		['y', 'x', 'c', 'v']
	],
	AZERTY: [
		['a', 'z', 'e', 'r'],
		['q', 's', 'd', 'f'],
		['w', 'x', 'c', 'v']
	],
	DVORAK: [
		["'", ',', '.', 'p'],
		['a', 'o', 'e', 'u'],
		[';', 'q', 'j', 'k']
	],
	NULL: [
		['?', '?', '?', '?'],
		['?', '?', '?', '?'],
		['?', '?', '?', '?']
	]
})
