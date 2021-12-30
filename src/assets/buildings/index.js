const buildings = [
	// Age I
	{
		name: 'House',
		shortcut: ['0:0', '0:0'],
		icon: '/buildings/house.png',
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Mill',
		shortcut: ['0:0', '0:1'],
		icon: '/buildings/mill.png',
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Lumber Camp',
		shortcut: ['0:0', '0:2'],
		icon: '/buildings/lc.png',
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Mining Camp',
		shortcut: ['0:0', '0:3'],
		icon: '/buildings/mc.png',
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Farm',
		shortcut: ['0:0', '1:0'],
		icon: '/buildings/farm.png',
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Barracks',
		shortcut: ['0:0', '1:1'],
		icon: '/buildings/barracks.png',
		type: 'military',
		age: 'I',
		group: 'COMMON'
	},
	{
		name: 'Dock',
		shortcut: ['0:0', '1:2'],
		icon: '/buildings/dock.png',
		type: 'economic',
		age: 'I',
		group: 'COMMON'
	},
	{
		name: 'Outpost',
		shortcut: ['0:0', '2:0'],
		icon: '/buildings/outpost.png',
		type: 'fortified',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Palisade',
		shortcut: ['0:0', '2:1'],
		icon: '/buildings/palisade.png',
		type: 'fortified',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Gate',
		shortcut: ['0:0', '2:2'],
		icon: '/buildings/palisade-gate.png',
		type: 'fortified',
		age: 'I',
		group: 'GENERIC'
	},
	// Age II
	{
		name: 'Blacksmith',
		shortcut: ['0:1', '0:0'],
		icon: '/buildings/blacksmith.png',
		type: 'research',
		age: 'II',
		group: 'COMMON'
	},
	{
		name: 'Market',
		shortcut: ['0:1', '0:1'],
		icon: '/buildings/market.png',
		type: 'economic',
		age: 'II',
		group: 'COMMON'
	},
	{
		name: 'Town Center',
		shortcut: ['0:1', '0:2'],
		icon: '/buildings/tc.png',
		type: 'economic',
		age: 'II',
		group: 'COMMON'
	},
	{
		name: 'AR',
		shortcut: ['0:1', '1:0'],
		icon: '/buildings/ar.png',
		type: 'military',
		age: 'II',
		group: 'COMMON'
	},
	{
		name: 'Stable',
		shortcut: ['0:1', '1:1'],
		icon: '/buildings/stable.png',
		type: 'military',
		age: 'II',
		group: 'GENERIC'
	},
	{
		name: 'Tower',
		shortcut: ['0:1', '2:0'],
		icon: '/buildings/tower.png',
		type: 'fortified',
		age: 'II',
		group: 'GENERIC'
	},
	{
		name: 'Wall',
		shortcut: ['0:1', '2:1'],
		icon: '/buildings/wall.png',
		type: 'fortified',
		age: 'II',
		group: 'GENERIC'
	},
	{
		name: 'Gate',
		shortcut: ['0:1', '2:2'],
		icon: '/buildings/stone-gate.png',
		type: 'fortified',
		age: 'II',
		group: 'GENERIC'
	},
	// Age III
	{
		name: 'Monastery',
		shortcut: ['0:2', '0:0'],
		icon: '/buildings/monastery.png',
		type: 'research',
		age: 'III',
		group: 'COMMON'
	},
	{
		name: 'Siege',
		shortcut: ['0:2', '1:0'],
		icon: '/buildings/siege.png',
		type: 'military',
		age: 'III',
		group: 'COMMON'
	},
	{
		name: 'Keep',
		shortcut: ['0:2', '2:0'],
		icon: '/buildings/keep.png',
		type: 'fortified',
		age: 'III',
		group: 'GENERIC'
	},
	// Age IV
	{
		name: 'University',
		shortcut: ['0:3', '0:0'],
		icon: '/buildings/university.png',
		type: 'research',
		age: 'IV',
		group: 'GENERIC'
	},
	/**
	 * Mongol-specific
	 */
	{
		name: 'Ovoo',
		shortcut: ['0:0', '0:0'],
		icon: '/buildings/ovoo.png',
		type: 'economic',
		age: 'I',
		group: 'MONGOL'
	},
	{
		name: 'Ger',
		shortcut: ['0:0', '0:1'],
		icon: '/buildings/ger.png',
		type: 'economic',
		age: 'I',
		group: 'MONGOL'
	},
	{
		name: 'Pasture',
		shortcut: ['0:0', '1:0'],
		icon: '/buildings/ger.png',
		type: 'economic',
		age: 'I',
		group: 'MONGOL'
	},
	{
		name: 'Outpost',
		shortcut: ['0:0', '2:0'],
		icon: '/buildings/outpost.png',
		type: 'fortified',
		age: 'I',
		group: 'MONGOL'
	},
	// Stable in Age I
	{
		name: 'Stable',
		shortcut: ['0:0', '1:3'],
		icon: '/buildings/stable.png',
		type: 'military',
		age: 'I',
		group: 'MONGOL'
	},
	/**
	 * Rus-specific
	 */
	{
		name: 'House',
		shortcut: ['0:0', '0:0'],
		icon: '/buildings/house.png',
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Cabin',
		shortcut: ['0:0', '0:1'],
		icon: '/buildings/hunting-cabin.png',
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Lumber Camp',
		shortcut: ['0:0', '0:2'],
		icon: '/buildings/lc.png',
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Mining Camp',
		shortcut: ['0:0', '0:3'],
		icon: '/buildings/mc.png',
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Farm',
		shortcut: ['0:0', '1:0'],
		icon: '/buildings/farm.png',
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Fortress',
		shortcut: ['0:0', '2:0'],
		icon: '/buildings/wooden-fortress.png',
		type: 'fortified',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Palisade',
		shortcut: ['0:0', '2:1'],
		icon: '/buildings/palisade.png',
		type: 'fortified',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Gate',
		shortcut: ['0:0', '2:2'],
		icon: '/buildings/palisade-gate.png',
		type: 'fortified',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Stable',
		shortcut: ['0:1', '1:1'],
		icon: '/buildings/stable.png',
		type: 'military',
		age: 'II',
		group: 'RUS'
	},
	{
		name: 'Keep',
		shortcut: ['0:2', '2:0'],
		icon: '/buildings/keep.png',
		type: 'fortified',
		age: 'III',
		group: 'RUS'
	},
	{
		name: 'University',
		shortcut: ['0:3', '0:0'],
		icon: '/buildings/university.png',
		type: 'research',
		age: 'IV',
		group: 'RUS'
	}
]

export default buildings
