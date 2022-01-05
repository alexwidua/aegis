import useStore from '@store'
import buildings from '@assets/buildings'

const useBuilding = (buildingName) => {
	const currentKeyboardLayout = useStore((state) => state.keyboardMap)
	const matchingBuilding =
		buildings?.find((el) => buildingName === el.name) || null

	if (!matchingBuilding) return null

	const positionOnGridFirstKey = matchingBuilding.shortcut[0].split(':')
	const positionOnGridSecondKey = matchingBuilding.shortcut[1].split(':')

	const positionOnKeyboardFirstKey =
		currentKeyboardLayout[positionOnGridFirstKey[0]][
			positionOnGridFirstKey[1]
		]
	const positionOnKeyboardSecondKey =
		currentKeyboardLayout[positionOnGridSecondKey[0]][
			positionOnGridSecondKey[1]
		]

	const { name, icon, type, age, group } = matchingBuilding
	const shortcuts = [positionOnKeyboardFirstKey, positionOnKeyboardSecondKey]

	return { name, icon, type, age, group, shortcuts }
}

export default useBuilding
