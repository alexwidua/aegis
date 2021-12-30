const buildings = [
	// Age I
	{
		name: 'House',
		hotkeys: [
			{ qwerty: 'q', qwertz: 'q', azerty: 'a' },
			{ qwerty: 'q', qwertz: 'q', azerty: 'a' }
		],
		icon: '/buildings/house.png',
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Mill',
		hotkeys: [
			{ qwerty: 'q', qwertz: 'q', azerty: 'a' },
			{ qwerty: 'w', qwertz: 'w', azerty: 'z' }
		],
		icon: '/buildings/mill.png',
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'LC',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'e'],
		icon: '/buildings/lc.png',
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'MC',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'r'],
		icon: '/buildings/mc.png',
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Farm',
		hotkeys: [
			{ qwerty: 'q', qwertz: 'q', azerty: 'a' },
			{ qwerty: 'a', qwertz: 'a', azerty: 'q' }
		],
		icon: '/buildings/farm.png',
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Barracks',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 's'],
		icon: '/buildings/barracks.png',
		type: 'military',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Dock',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'd'],
		icon: '/buildings/dock.png',
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Outpost',
		hotkeys: [
			{ qwerty: 'q', qwertz: 'q', azerty: 'a' },
			{ qwerty: 'z', qwertz: 'y', azerty: 'w' }
		],
		icon: '/buildings/outpost.png',
		type: 'fortified',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Palisade',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'x'],
		icon: '/buildings/palisade.png',
		type: 'fortified',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Gate',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'c'],
		icon: '/buildings/palisade-gate.png',
		type: 'fortified',
		age: 'I',
		civSpecific: false
	},
	// Age II
	{
		name: 'Blacksmith',
		hotkeys: [
			{ qwerty: 'w', qwertz: 'w', azerty: 'z' },
			{ qwerty: 'q', qwertz: 'q', azerty: 'a' }
		],
		icon: '/buildings/blacksmith.png',
		type: 'research',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Market',
		hotkeys: [
			{ qwerty: 'w', qwertz: 'w', azerty: 'z' },
			{ qwerty: 'w', qwertz: 'w', azerty: 'z' }
		],
		icon: '/buildings/market.png',
		type: 'economic',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'TC',
		hotkeys: [{ qwerty: 'w', qwertz: 'w', azerty: 'z' }, 'e'],
		icon: '/buildings/tc.png',
		type: 'economic',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'AR',
		hotkeys: [
			{ qwerty: 'w', qwertz: 'w', azerty: 'z' },
			{ qwerty: 'a', qwertz: 'a', azerty: 'q' }
		],
		icon: '/buildings/ar.png',
		type: 'military',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Stable',
		hotkeys: [{ qwerty: 'w', qwertz: 'w', azerty: 'z' }, 's'],
		icon: '/buildings/stable.png',
		type: 'military',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Tower',
		hotkeys: [
			{ qwerty: 'w', qwertz: 'w', azerty: 'z' },
			{ qwerty: 'z', qwertz: 'y', azerty: 'w' }
		],
		icon: '/buildings/tower.png',
		type: 'fortified',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Wall',
		hotkeys: [{ qwerty: 'w', qwertz: 'w', azerty: 'z' }, 'x'],
		icon: '/buildings/wall.png',
		type: 'fortified',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Gate',
		hotkeys: [{ qwerty: 'w', qwertz: 'w', azerty: 'z' }, 'c'],
		icon: '/buildings/stone-gate.png',
		type: 'fortified',
		age: 'II',
		civSpecific: false
	},
	// Age III
	{
		name: 'Monastery',
		hotkeys: ['e', { qwerty: 'q', qwertz: 'q', azerty: 'a' }],
		icon: '/buildings/monastery.png',
		type: 'research',
		age: 'III',
		civSpecific: false
	},
	{
		name: 'Siege',
		hotkeys: ['e', { qwerty: 'a', qwertz: 'a', azerty: 'q' }],
		icon: '/buildings/siege.png',
		type: 'military',
		age: 'III',
		civSpecific: false
	},
	{
		name: 'Keep',
		hotkeys: ['e', { qwerty: 'z', qwertz: 'y', azerty: 'w' }],
		icon: '/buildings/keep.png',
		type: 'fortified',
		age: 'III',
		civSpecific: false
	},
	// Age IV
	{
		name: 'University',
		hotkeys: ['r', { qwerty: 'q', qwertz: 'q', azerty: 'a' }],
		icon: '/buildings/university.png',
		type: 'research',
		age: 'IV',
		civSpecific: true
	}
]

export default buildings
