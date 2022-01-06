import styles from './footer.module.scss'

const Footer = ({ children }) => {
	return <footer className={styles.footer}>{children}</footer>
}

export default Footer
