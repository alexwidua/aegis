import House from './house.png'
import Mill from './mill.png'
import LumberCamp from './lumber-camp.png'
import MiningCamp from './mining-camp.png'
import Farm from './farm.png'
import Barracks from './barracks.png'
import Dock from './dock.png'
import Outpost from './outpost.png'
import WoodenWall from './wooden-wall.png'
import WoodenGate from './wooden-gate.png'
import Blacksmith from './blacksmith.png'
import Market from './market.png'
import TownCenter from './town-center.png'
import ArcheryRange from './archery-range.png'
import Stable from './stable.png'
import StoneTower from './stone-tower.png'
import StoneWall from './stone-wall.png'
import StoneGate from './stone-gate.png'
import Monastery from './monastery.png'
import SiegeWorkshop from './siege-workshop.png'
import Keep from './keep.png'
import University from './university.png'

const buildings = [
	// Age I
	{
		name: 'House',
		hotkeys: [
			{ qwerty: 'q', qwertz: 'q', azerty: 'a' },
			{ qwerty: 'q', qwertz: 'q', azerty: 'a' }
		],
		icon: House,
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
		icon: Mill,
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'LC',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'e'],
		icon: LumberCamp,
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'MC',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'r'],
		icon: MiningCamp,
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
		icon: Farm,
		type: 'economic',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Barracks',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 's'],
		icon: Barracks,
		type: 'military',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Dock',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'd'],
		icon: Dock,
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
		icon: Outpost,
		type: 'fort',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Wooden Wall',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'x'],
		icon: WoodenWall,
		type: 'fort',
		age: 'I',
		civSpecific: false
	},
	{
		name: 'Wooden Gate',
		hotkeys: [{ qwerty: 'q', qwertz: 'q', azerty: 'a' }, 'c'],
		icon: WoodenGate,
		type: 'fort',
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
		icon: Blacksmith,
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
		icon: Market,
		type: 'economic',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'TC',
		hotkeys: [{ qwerty: 'w', qwertz: 'w', azerty: 'z' }, 'e'],
		icon: TownCenter,
		type: 'economic',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Archery Range',
		hotkeys: [
			{ qwerty: 'w', qwertz: 'w', azerty: 'z' },
			{ qwerty: 'a', qwertz: 'a', azerty: 'q' }
		],
		icon: ArcheryRange,
		type: 'military',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Stable',
		hotkeys: [{ qwerty: 'w', qwertz: 'w', azerty: 'z' }, 's'],
		icon: Stable,
		type: 'military',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Stone Tower',
		hotkeys: [
			{ qwerty: 'w', qwertz: 'w', azerty: 'z' },
			{ qwerty: 'z', qwertz: 'y', azerty: 'w' }
		],
		icon: StoneTower,
		type: 'fort',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Stone Wall',
		hotkeys: [{ qwerty: 'w', qwertz: 'w', azerty: 'z' }, 'x'],
		icon: StoneWall,
		type: 'fort',
		age: 'II',
		civSpecific: false
	},
	{
		name: 'Stone Gate',
		hotkeys: [{ qwerty: 'w', qwertz: 'w', azerty: 'z' }, 'c'],
		icon: StoneGate,
		type: 'fort',
		age: 'II',
		civSpecific: false
	},
	// Age III
	{
		name: 'Monastery',
		hotkeys: ['e', { qwerty: 'q', qwertz: 'q', azerty: 'a' }],
		icon: Monastery,
		type: 'research',
		age: 'III',
		civSpecific: false
	},
	{
		name: 'Siege Workshop',
		hotkeys: ['e', { qwerty: 'a', qwertz: 'a', azerty: 'q' }],
		icon: SiegeWorkshop,
		type: 'military',
		age: 'III',
		civSpecific: false
	},
	{
		name: 'Keep',
		hotkeys: ['e', { qwerty: 'z', qwertz: 'y', azerty: 'w' }],
		icon: Keep,
		type: 'fort',
		age: 'III',
		civSpecific: false
	},
	// Age IV
	{
		name: 'University',
		hotkeys: ['r', { qwerty: 'q', qwertz: 'q', azerty: 'a' }],
		icon: University,
		type: 'research',
		age: 'IV',
		civSpecific: true
	}
]

export default buildings
