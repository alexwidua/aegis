const filterBuildings = (arr, filterParam) => {
	return arr.filter((building) => {
		if (!filterParam.includeCivSpecific && building.civSpecific) return null
		return (
			filterParam.types[building.type] && filterParam.ages[building.age]
		)
	})
}

export { filterBuildings }
