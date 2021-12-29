import React from 'react'
import styles from './checkbox.module.scss'

const Checkbox = ({ value, onChange, children, ...rest }) => {
	return (
		<label
			className={`${styles.label} ${value ? styles.checked : null}`}
			{...rest}>
			<input type="checkbox" checked={value} onChange={onChange} />
			{children}
		</label>
	)
}

export default Checkbox
