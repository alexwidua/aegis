import styles from './options.module.scss'
import SegmentedInput from '../components/ui/SegmentedInput'
import useStore from '../store/store'

import GameView from './GameView'
import buildings from '../assets/buildings'

import Modal from 'react-modal'

Modal.setAppElement('#root')

const OptionsView = () => {
	const {
		scoreLimit,
		handleScoreLimitChange,
		showKeyLabels,
		handleShowKeyLabels
	} = useStore((state) => ({
		scoreLimit: state.scoreLimit,
		handleScoreLimitChange: state.handleScoreLimitChange,
		showKeyLabels: state.showKeyLabels,
		handleShowKeyLabels: state.handleShowKeyLabels
	}))
	return (
		<div className={styles.container}>
			<div className={styles.options}>
				<h2>Options</h2>
				<OptionItem
					name={`buildings`}
					label={`Number of buildings`}
					value={scoreLimit}
					onValueChange={(value) => handleScoreLimitChange(value)}
					options={[{ value: 3 }, { value: 50 }, { value: 100 }]}
				/>
				<OptionItem
					name={`showLabels`}
					label={`Show key labels`}
					value={showKeyLabels}
					onValueChange={(value) => handleShowKeyLabels(value)}
					options={[
						{ children: 'Show', value: 'SHOW' },
						{ children: 'Fade in', value: 'FADE_IN' },
						{ children: 'Hide', value: 'HIDE' }
					]}
				/>
			</div>
			<div className={styles.preview}>
				<GameView
					name={'Preview'}
					icon={buildings[0].icon}
					hotkeys={buildings[0].hotkeys}
				/>
			</div>
		</div>
	)
}

const OptionItem = ({ name, label, value, onValueChange, options }) => {
	return (
		<div className={styles.item}>
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

export default OptionsView
