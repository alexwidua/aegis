import { useCallback } from 'react'
import useStore from '@store'
import Checkbox from '@components/Checkbox'
import { WrapSegmentedInputComponent, WrapCheckboxComponent } from './shared'
import styles from './gameOptions.module.scss'

// Assets
import IconGeneric from '@assets/icons/flags/generic.png'
import IconMongol from '@assets/icons/flags/mongol.png'
import IconRus from '@assets/icons/flags/rus.png'
import IconChinese from '@assets/icons/flags/chinese.png'
import IconDelhi from '@assets/icons/flags/delhi.png'
import IconAbbasid from '@assets/icons/flags/abbasid.png'

const GameOptions = () => {
	/**
	 * Get all option values and setters from Zustand
	 */
	const {
		scoreLimit,
		handleSetScoreLimit,
		showKeyLabels,
		handleSetShowKeyLabels,
		iconStyle,
		handleSetPromptStyle,
		buildingFilter,
		handleSetBuildingFilter
	} = useStore((state) => ({
		scoreLimit: state.scoreLimit,
		handleSetScoreLimit: state.handleSetScoreLimit,
		showKeyLabels: state.showKeyLabels,
		handleSetShowKeyLabels: state.handleSetShowKeyLabels,
		iconStyle: state.iconStyle,
		handleSetPromptStyle: state.handleSetPromptStyle,
		buildingFilter: state.buildingFilter,
		handleSetBuildingFilter: state.handleSetBuildingFilter
	}))
	const { ages, types, group } = buildingFilter

	/**
	 * Handle building filter
	 */
	const handleFilter = useCallback(
		(category, key, isCheckbox) => {
			const obj = buildingFilter
			if (isCheckbox) obj[category][key] = !obj[category][key]
			else obj[category] = key
			handleSetBuildingFilter(obj)
		},
		[buildingFilter, handleSetBuildingFilter]
	)

	return (
		<div className={styles.container}>
			<h2>Options</h2>
			<h3>Buildings</h3>
			<WrapSegmentedInputComponent
				name={`buildings`}
				label={`Number of buildings each game`}
				value={scoreLimit}
				onValueChange={(value) => handleSetScoreLimit(value)}
				options={[{ value: 25 }, { value: 50 }, { value: 100 }]}
			/>
			<WrapSegmentedInputComponent
				name={`civ`}
				label={`Civilization`}
				value={group}
				onValueChange={(value) => handleFilter('group', value)}
				options={[
					{
						children: `<img src="${IconGeneric}" alt="Flag"/>`,
						value: 'GENERIC'
					},
					{
						children: `<img src="${IconMongol}" alt="Flag"/>`,
						value: 'MONGOL'
					},
					{
						children: `<img src="${IconRus}" alt="Flag"/>`,
						value: 'RUS'
					},
					{
						children: `<img src="${IconChinese}" alt="Flag"/>`,
						value: 'CHINESE'
					},
					{
						children: `<img src="${IconDelhi}" alt="Flag"/>`,
						value: 'DELHI'
					},
					{
						children: `<img src="${IconAbbasid}" alt="Flag"/>`,
						value: 'ABBASID'
					}
				]}
			/>
			<WrapCheckboxComponent label={`Restrict to age`}>
				{Object.keys(ages).map((el, i) => (
					<Checkbox
						value={ages[el]}
						onChange={() => handleFilter('ages', el, true)}
						key={i}
						style={{ textTransform: 'uppercase' }}>
						{el}
					</Checkbox>
				))}
			</WrapCheckboxComponent>
			<WrapCheckboxComponent label={`Restrict to type`}>
				{Object.keys(types).map((el, i) => (
					<Checkbox
						value={types[el]}
						onChange={() => handleFilter('types', el, true)}
						key={i}>
						{el}
					</Checkbox>
				))}
			</WrapCheckboxComponent>
			{/*
			 * Display
			 */}
			<h3>Display</h3>
			<WrapSegmentedInputComponent
				name={`showLabels`}
				label={`Show key labels on buttons`}
				value={showKeyLabels}
				onValueChange={(value) => handleSetShowKeyLabels(value)}
				options={[
					{ children: 'Show', value: 'SHOW' },
					{ children: 'Fade in after 1s', value: 'FADE_IN' },
					{ children: 'Hide', value: 'HIDE' }
				]}
			/>
			<WrapSegmentedInputComponent
				name={`iconStyle`}
				label={`Icon style <span class='new'>New</span>`}
				value={iconStyle}
				onValueChange={(value) => handleSetPromptStyle(value)}
				options={[
					{ children: 'Single icon', value: 'SINGLE' },
					{ children: 'Spatial grid', value: 'GRID' }
				]}
			/>
		</div>
	)
}

export default GameOptions
