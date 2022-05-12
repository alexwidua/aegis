/**
 * TODO: Refactor this document, right now there is quite some redundancy
 * caused by the janky way buildings are filtered.
 */

import ar from '../icons/buildings/ar.png'
import barracks from '../icons/buildings/barracks.png'
import blacksmith from '../icons/buildings/blacksmith.png'
import dock from '../icons/buildings/dock.png'
import farm from '../icons/buildings/farm.png'
import ger from '../icons/buildings/ger.png'
import granary from '../icons/buildings/granary.png'
import house from '../icons/buildings/house.png'
import how from '../icons/buildings/how.png'
import hc from '../icons/buildings/hunting-cabin.png'
import keep from '../icons/buildings/keep.png'
import lc from '../icons/buildings/lc.png'
import market from '../icons/buildings/market.png'
import mc from '../icons/buildings/mc.png'
import mill from '../icons/buildings/mill.png'
import monastery from '../icons/buildings/monastery.png'
import mosque from '../icons/buildings/mosque.png'
import outpost from '../icons/buildings/outpost.png'
import ovoo from '../icons/buildings/ovoo.png'
import pagoda from '../icons/buildings/pagoda.png'
import palisadeGate from '../icons/buildings/palisade-gate.png'
import palisade from '../icons/buildings/palisade.png'
import pasture from '../icons/buildings/pasture.png'
import siege from '../icons/buildings/siege.png'
import stable from '../icons/buildings/stable.png'
import stoneGate from '../icons/buildings/stone-gate.png'
import tc from '../icons/buildings/tc.png'
import tower from '../icons/buildings/tower.png'
import university from '../icons/buildings/university.png'
import village from '../icons/buildings/village.png'
import wall from '../icons/buildings/wall.png'
import woodenFortress from '../icons/buildings/wooden-fortress.png'

const buildings = [
	// Age I
	{
		name: 'House',
		shortcut: ['0:0', '0:0'],
		icon: house,
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Mill',
		shortcut: ['0:0', '0:1'],
		icon: mill,
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Lumber Camp',
		shortcut: ['0:0', '0:2'],
		icon: lc,
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Mining Camp',
		shortcut: ['0:0', '0:3'],
		icon: mc,
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Farm',
		shortcut: ['0:0', '1:0'],
		icon: farm,
		type: 'economic',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Barracks',
		shortcut: ['0:0', '1:1'],
		icon: barracks,
		type: 'military',
		age: 'I',
		group: 'COMMON'
	},
	{
		name: 'Dock',
		shortcut: ['0:0', '1:2'],
		icon: dock,
		type: 'economic',
		age: 'I',
		group: 'COMMON'
	},
	{
		name: 'Outpost',
		shortcut: ['0:0', '2:0'],
		icon: outpost,
		type: 'fortified',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Palisade',
		shortcut: ['0:0', '2:1'],
		icon: palisade,
		type: 'fortified',
		age: 'I',
		group: 'GENERIC'
	},
	{
		name: 'Palisade Gate',
		shortcut: ['0:0', '2:2'],
		icon: palisadeGate,
		type: 'fortified',
		age: 'I',
		group: 'GENERIC'
	},
	// Age II
	{
		name: 'Blacksmith',
		shortcut: ['0:1', '0:0'],
		icon: blacksmith,
		type: 'research',
		age: 'II',
		group: 'COMMON'
	},
	{
		name: 'Market',
		shortcut: ['0:1', '0:1'],
		icon: market,
		type: 'economic',
		age: 'II',
		group: 'COMMON'
	},
	{
		name: 'Town Center',
		shortcut: ['0:1', '0:2'],
		icon: tc,
		type: 'economic',
		age: 'II',
		group: 'COMMON'
	},
	{
		name: 'Archery Range',
		shortcut: ['0:1', '1:0'],
		icon: ar,
		type: 'military',
		age: 'II',
		group: 'COMMON'
	},
	{
		name: 'Stable',
		shortcut: ['0:1', '1:1'],
		icon: stable,
		type: 'military',
		age: 'II',
		group: 'GENERIC'
	},
	{
		name: 'Stone Tower',
		shortcut: ['0:1', '2:0'],
		icon: tower,
		type: 'fortified',
		age: 'II',
		group: 'GENERIC'
	},
	{
		name: 'Stone Wall',
		shortcut: ['0:1', '2:1'],
		icon: wall,
		type: 'fortified',
		age: 'II',
		group: 'GENERIC'
	},
	{
		name: 'Stone Gate',
		shortcut: ['0:1', '2:2'],
		icon: stoneGate,
		type: 'fortified',
		age: 'II',
		group: 'GENERIC'
	},
	// Age III
	{
		name: 'Monastery',
		shortcut: ['0:2', '0:0'],
		icon: monastery,
		type: 'research',
		age: 'III',
		group: 'GENERIC'
	},
	{
		name: 'Siege',
		shortcut: ['0:2', '1:0'],
		icon: siege,
		type: 'military',
		age: 'III',
		group: 'COMMON'
	},
	{
		name: 'Keep',
		shortcut: ['0:2', '2:0'],
		icon: keep,
		type: 'fortified',
		age: 'III',
		group: 'GENERIC'
	},
	// Age IV
	{
		name: 'University',
		shortcut: ['0:3', '0:0'],
		icon: university,
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
		icon: ovoo,
		type: 'economic',
		age: 'I',
		group: 'MONGOL'
	},
	{
		name: 'Ger',
		shortcut: ['0:0', '0:1'],
		icon: ger,
		type: 'economic',
		age: 'I',
		group: 'MONGOL'
	},
	{
		name: 'Pasture',
		shortcut: ['0:0', '1:0'],
		icon: pasture,
		type: 'economic',
		age: 'I',
		group: 'MONGOL'
	},
	{
		name: 'Outpost',
		shortcut: ['0:0', '2:0'],
		icon: outpost,
		type: 'fortified',
		age: 'I',
		group: 'MONGOL'
	},
	// Stable in Age I
	{
		name: 'Stable',
		shortcut: ['0:0', '1:3'],
		icon: stable,
		type: 'military',
		age: 'I',
		group: 'MONGOL'
	},
	{
		name: 'Monastery',
		shortcut: ['0:2', '0:0'],
		icon: monastery,
		type: 'research',
		age: 'III',
		group: 'MONGOL'
	},
	/**
	 * Rus-specific
	 */
	{
		name: 'House',
		shortcut: ['0:0', '0:0'],
		icon: house,
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Cabin',
		shortcut: ['0:0', '0:1'],
		icon: hc,
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Lumber Camp',
		shortcut: ['0:0', '0:2'],
		icon: lc,
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Mining Camp',
		shortcut: ['0:0', '0:3'],
		icon: mc,
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Farm',
		shortcut: ['0:0', '1:0'],
		icon: farm,
		type: 'economic',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Fortress',
		shortcut: ['0:0', '2:0'],
		icon: woodenFortress,
		type: 'fortified',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Palisade',
		shortcut: ['0:0', '2:1'],
		icon: palisade,
		type: 'fortified',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Palisade Gate',
		shortcut: ['0:0', '2:2'],
		icon: palisadeGate,
		type: 'fortified',
		age: 'I',
		group: 'RUS'
	},
	{
		name: 'Stable',
		shortcut: ['0:1', '1:1'],
		icon: stable,
		type: 'military',
		age: 'II',
		group: 'RUS'
	},
	{
		name: 'Monastery',
		shortcut: ['0:2', '0:0'],
		icon: monastery,
		type: 'research',
		age: 'III',
		group: 'RUS'
	},
	{
		name: 'Keep',
		shortcut: ['0:2', '2:0'],
		icon: keep,
		type: 'fortified',
		age: 'III',
		group: 'RUS'
	},
	{
		name: 'University',
		shortcut: ['0:3', '0:0'],
		icon: university,
		type: 'research',
		age: 'IV',
		group: 'RUS'
	},
	/**
	 * Chinese-specific
	 */
	{
		name: 'House',
		shortcut: ['0:0', '0:0'],
		icon: house,
		type: 'economic',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Mill',
		shortcut: ['0:0', '0:1'],
		icon: mill,
		type: 'economic',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Lumber Camp',
		shortcut: ['0:0', '0:2'],
		icon: lc,
		type: 'economic',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Mining Camp',
		shortcut: ['0:0', '0:3'],
		icon: mc,
		type: 'economic',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Farm',
		shortcut: ['0:0', '1:0'],
		icon: farm,
		type: 'economic',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Outpost',
		shortcut: ['0:0', '2:0'],
		icon: outpost,
		type: 'fortified',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Palisade',
		shortcut: ['0:0', '2:1'],
		icon: palisade,
		type: 'fortified',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Palisade Gate',
		shortcut: ['0:0', '2:2'],
		icon: palisadeGate,
		type: 'fortified',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Stable',
		shortcut: ['0:1', '1:1'],
		icon: stable,
		type: 'military',
		age: 'II',
		group: 'CHINESE'
	},
	{
		name: 'Village',
		shortcut: ['0:0', '1:3'],
		icon: village,
		type: 'economic',
		age: 'I',
		group: 'CHINESE'
	},
	{
		name: 'Stone Tower',
		shortcut: ['0:1', '2:0'],
		icon: tower,
		type: 'fortified',
		age: 'II',
		group: 'CHINESE'
	},
	{
		name: 'Stone Wall',
		shortcut: ['0:1', '2:1'],
		icon: wall,
		type: 'fortified',
		age: 'II',
		group: 'CHINESE'
	},
	{
		name: 'Stone Gate',
		shortcut: ['0:1', '2:2'],
		icon: stoneGate,
		type: 'fortified',
		age: 'II',
		group: 'CHINESE'
	},
	{
		name: 'Monastery',
		shortcut: ['0:2', '0:0'],
		icon: monastery,
		type: 'research',
		age: 'III',
		group: 'CHINESE'
	},
	{
		name: 'Granary',
		shortcut: ['0:1', '1:2'],
		icon: granary,
		type: 'economic',
		age: 'II',
		group: 'CHINESE'
	},
	{
		name: 'Keep',
		shortcut: ['0:2', '2:0'],
		icon: keep,
		type: 'fortified',
		age: 'III',
		group: 'CHINESE'
	},
	{
		name: 'University',
		shortcut: ['0:3', '0:0'],
		icon: university,
		type: 'research',
		age: 'IV',
		group: 'CHINESE'
	},
	{
		name: 'Pagoda',
		shortcut: ['0:2', '1:1'],
		icon: pagoda,
		type: 'economic',
		age: 'III',
		group: 'CHINESE'
	},
	/**
	 * Abbasid-specific
	 */
	{
		name: 'House',
		shortcut: ['0:0', '0:0'],
		icon: house,
		type: 'economic',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'Mill',
		shortcut: ['0:0', '0:1'],
		icon: mill,
		type: 'economic',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'Lumber Camp',
		shortcut: ['0:0', '0:2'],
		icon: lc,
		type: 'economic',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'Mining Camp',
		shortcut: ['0:0', '0:3'],
		icon: mc,
		type: 'economic',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'Farm',
		shortcut: ['0:0', '1:0'],
		icon: farm,
		type: 'economic',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'House of Wisdom',
		shortcut: ['0:0', '1:3'],
		icon: how,
		type: 'economic',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'Outpost',
		shortcut: ['0:0', '2:0'],
		icon: outpost,
		type: 'fortified',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'Palisade',
		shortcut: ['0:0', '2:1'],
		icon: palisade,
		type: 'fortified',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'Palisade Gate',
		shortcut: ['0:0', '2:2'],
		icon: palisadeGate,
		type: 'fortified',
		age: 'I',
		group: 'ABBASID'
	},
	{
		name: 'Stable',
		shortcut: ['0:1', '1:1'],
		icon: stable,
		type: 'military',
		age: 'II',
		group: 'ABBASID'
	},
	{
		name: 'Stone Tower',
		shortcut: ['0:1', '2:0'],
		icon: tower,
		type: 'fortified',
		age: 'II',
		group: 'ABBASID'
	},
	{
		name: 'Stone Wall',
		shortcut: ['0:1', '2:1'],
		icon: wall,
		type: 'fortified',
		age: 'II',
		group: 'ABBASID'
	},
	{
		name: 'Stone Gate',
		shortcut: ['0:1', '2:2'],
		icon: stoneGate,
		type: 'fortified',
		age: 'II',
		group: 'ABBASID'
	},
	{
		name: 'Tent',
		shortcut: ['0:2', '0:0'],
		icon: mosque,
		type: 'economic',
		age: 'III',
		group: 'ABBASID'
	},
	{
		name: 'Keep',
		shortcut: ['0:2', '2:0'],
		icon: keep,
		type: 'fortified',
		age: 'III',
		group: 'ABBASID'
	},
	{
		name: 'University',
		shortcut: ['0:3', '0:0'],
		icon: university,
		type: 'research',
		age: 'IV',
		group: 'ABBASID'
	},
	/**
	 * Delhi-specific
	 */
	{
		name: 'House',
		shortcut: ['0:0', '0:0'],
		icon: house,
		type: 'economic',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Mill',
		shortcut: ['0:0', '0:1'],
		icon: mill,
		type: 'economic',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Lumber Camp',
		shortcut: ['0:0', '0:2'],
		icon: lc,
		type: 'economic',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Mining Camp',
		shortcut: ['0:0', '0:3'],
		icon: mc,
		type: 'economic',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Farm',
		shortcut: ['0:0', '1:0'],
		icon: farm,
		type: 'economic',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Mosque',
		shortcut: ['0:0', '1:3'],
		icon: mosque,
		type: 'economic',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Outpost',
		shortcut: ['0:0', '2:0'],
		icon: outpost,
		type: 'fortified',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Palisade',
		shortcut: ['0:0', '2:1'],
		icon: palisade,
		type: 'fortified',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Palisade Gate',
		shortcut: ['0:0', '2:2'],
		icon: palisadeGate,
		type: 'fortified',
		age: 'I',
		group: 'DELHI'
	},
	{
		name: 'Stable',
		shortcut: ['0:1', '1:1'],
		icon: stable,
		type: 'military',
		age: 'II',
		group: 'DELHI'
	},
	{
		name: 'Stone Tower',
		shortcut: ['0:1', '2:0'],
		icon: tower,
		type: 'fortified',
		age: 'II',
		group: 'DELHI'
	},
	{
		name: 'Stone Wall',
		shortcut: ['0:1', '2:1'],
		icon: wall,
		type: 'fortified',
		age: 'II',
		group: 'DELHI'
	},
	{
		name: 'Stone Gate',
		shortcut: ['0:1', '2:2'],
		icon: stoneGate,
		type: 'fortified',
		age: 'II',
		group: 'DELHI'
	},
	{
		name: 'Keep',
		shortcut: ['0:2', '2:0'],
		icon: keep,
		type: 'fortified',
		age: 'III',
		group: 'DELHI'
	},
	{
		name: 'University',
		shortcut: ['0:3', '0:0'],
		icon: university,
		type: 'research',
		age: 'IV',
		group: 'DELHI'
	}
]

export default buildings
