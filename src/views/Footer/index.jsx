import HRE from './../../assets/icons/flags/hre.png'
import Wood from './../../assets/icons/misc/wood.png'
import Gold from './../../assets/icons/misc/gold.png'

const Footer = () => {
	return (
		<footer className={`footer`}>
			<ul>
				<li>
					Created with <img src={Wood} alt={`Wood`} /> in{' '}
					<img src={HRE} alt={`Holy Roman Empire`} />{' '}
				</li>
				<li>
					<a href="https://github.com/alexwidua/aegis">
						View on GitHub
					</a>
				</li>
				<li>
					<a href="https://ko-fi.com/alexwidua">Send tribute</a>
					<img src={Gold} alt={`Gold`} />
				</li>
			</ul>
		</footer>
	)
}

export default Footer
