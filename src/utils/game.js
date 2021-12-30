const filterBuildings = (arr, filterParam) => {
	const { types, ages, group } = filterParam

	return arr.filter((building) => {
		return (
			types[building.type] &&
			ages[building.age] &&
			(building.group === group || building.group === 'COMMON')
		)
	})
}

export { filterBuildings }
