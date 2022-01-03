/**
 * @file Wrap Input components to add additional styles.
 */

import styles from './shared.module.scss'
import SegmentedInput from '../../components/ui/SegmentedInput'

const WrapSegmentedInputComponent = ({
	name,
	label,
	value,
	onValueChange,
	options,
	...rest
}) => {
	return (
		<div className={styles.item} {...rest}>
			<div
				className={styles.label}
				dangerouslySetInnerHTML={{ __html: label }}
			/>
			<SegmentedInput
				name={name}
				value={value}
				onValueChange={onValueChange}
				options={options}
			/>
		</div>
	)
}

const WrapCheckboxComponent = ({ label, children, ...rest }) => {
	return (
		<div className={styles.item} {...rest}>
			<div className={styles.label}>{label}</div>
			<div className={styles.children}>{children}</div>
		</div>
	)
}

export { WrapSegmentedInputComponent, WrapCheckboxComponent }
