import styles from './options.module.scss'
import useStore from '../store/store'

import SegmentedInput from '../components/ui/SegmentedInput'
import Checkbox from '../components/ui/Checkbox'

const OptionsView = () => {
	const {
		keyboardLayout,
		handleSetKeyboardLayout,
		scoreLimit,
		handleSetScoreLimit,
		showKeyLabels,
		handleSetShowKey,
		buildingFilter,
		handleSetBuildingFilter
	} = useStore((state) => ({
		keyboardLayout: state.keyboardLayout,
		handleSetKeyboardLayout: state.handleSetKeyboardLayout,
		scoreLimit: state.scoreLimit,
		handleSetScoreLimit: state.handleSetScoreLimit,
		showKeyLabels: state.showKeyLabels,
		handleSetShowKey: state.handleSetShowKey,
		buildingFilter: state.buildingFilter,
		handleSetBuildingFilter: state.handleSetBuildingFilter
	}))

	/**
	 * TODO: Refactor and split up filter into several objects
	 */
	const handleFilter = (category, key) => {
		const obj = buildingFilter
		obj[category][key] = !obj[category][key]
		handleSetBuildingFilter(obj)
	}
	const filterTypes = Object.keys(buildingFilter.types).map((el, i) => (
		<Checkbox
			value={buildingFilter.types[el]}
			onChange={() => handleFilter('types', el)}
			key={i}>
			{el}
		</Checkbox>
	))
	const filterAges = Object.keys(buildingFilter.ages).map((el, i) => (
		<Checkbox
			value={buildingFilter.ages[el]}
			onChange={() => handleFilter('ages', el)}
			key={i}
			style={{ textTransform: 'uppercase' }}>
			{el}
		</Checkbox>
	))

	return (
		<div className={styles.container}>
			<div className={styles.options}>
				<h2>Options</h2>
				<h3>Buildings</h3>
				<ItemSegmentedInput
					name={`buildings`}
					label={`Number of buildings`}
					value={scoreLimit}
					onValueChange={(value) => handleSetScoreLimit(value)}
					options={[{ value: 25 }, { value: 50 }, { value: 100 }]}
					style={{ marginBottom: '1.25rem' }}
				/>
				<ItemCheckbox
					label={`Building ages`}
					style={{ marginBottom: '1.25rem' }}>
					{filterAges}
				</ItemCheckbox>
				<ItemCheckbox label={`Building types`}>
					{filterTypes}
				</ItemCheckbox>
				<h3>Display</h3>
				<ItemSegmentedInput
					name={`showLabels`}
					label={`Key labels`}
					value={showKeyLabels}
					onValueChange={(value) => handleSetShowKey(value)}
					options={[
						{ children: 'Show', value: 'SHOW' },
						{ children: 'Fade in after 1s', value: 'FADE_IN' },
						{ children: 'Hide', value: 'HIDE' }
					]}
				/>
				<ItemSegmentedInput
					name={`keyboardLayout`}
					label={`Keyboard layout`}
					value={keyboardLayout}
					onValueChange={(value) => handleSetKeyboardLayout(value)}
					options={[
						{ children: 'QWERTY', value: 'qwerty' },
						{ children: 'QWERTZ', value: 'qwertz' },
						{ children: 'AZERTY', value: 'azerty' }
					]}
				/>
			</div>
		</div>
	)
}

const ItemSegmentedInput = ({
	name,
	label,
	value,
	onValueChange,
	options,
	...rest
}) => {
	return (
		<div className={styles.item} {...rest}>
			<div className={styles.label}>{label}</div>
			<SegmentedInput
				name={name}
				value={value}
				onValueChange={onValueChange}
				options={options}
			/>
		</div>
	)
}

const ItemCheckbox = ({ label, children, ...rest }) => {
	return (
		<div className={styles.item} {...rest}>
			<div className={styles.label}>{label}</div>
			<div className={styles.children}>{children}</div>
		</div>
	)
}

export default OptionsView
