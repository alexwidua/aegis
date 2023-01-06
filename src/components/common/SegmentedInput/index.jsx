import React, { useCallback } from 'react'
import styles from './index.module.scss'

const ITEM_ID_DATA_ATTRIBUTE_NAME = 'data-segmented-input-item-id'

const SegmentedInput = ({
	name,
	value,
	options,
	onValueChange,
	propagateEscapeKeyDown = true,
	...rest
}) => {
	const handleChange = useCallback(
		(event) => {
			const id = event.currentTarget.getAttribute(
				ITEM_ID_DATA_ATTRIBUTE_NAME
			)
			const newValue = options[parseInt(id, 10)].value
			onValueChange(newValue, name)
		},
		[name, onValueChange, options]
	)

	const handleKeyDown = useCallback(
		(event) => {
			if (event.key !== 'Escape') {
				return
			}
			if (propagateEscapeKeyDown === false) {
				event.stopPropagation()
			}
			event.currentTarget.blur()
		},
		[propagateEscapeKeyDown]
	)

	return (
		<div className={styles['segmented-input']}>
			<div className={styles.labels}>
				{options.map((option, i) => {
					const children =
						typeof option.children === 'undefined'
							? option.icon
								? null
								: `${option.value}`
							: option.children

					return (
						<div className={styles.label} key={i}>
							<input
								{...rest}
								className={styles.input}
								checked={value === option.value}
								name={name}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								tabIndex={0}
								type="radio"
								value={`${option.value}`}
								{...{
									[ITEM_ID_DATA_ATTRIBUTE_NAME]: `${i}`
								}}
							/>
							<div className={styles.children}>
								{option.icon && option.icon !== 'Name' && (
									<img
										className={`
										${styles.icon}
										${children ? styles.gap : null}`}
										src={option.icon}
										alt={name}
									/>
								)}
								{option.icon === 'Name' && (
									<span className={styles.nameIcon}>A</span>
								)}
								{children && children}
							</div>
						</div>
					)
				})}
			</div>
			<div className={styles.border} />
		</div>
	)
}

export default SegmentedInput
