import { h } from 'preact';
import Styles from './styles.module.scss';

function Nav() {
	return (
		<nav className={Styles.nav} id ="top">
			<a className={Styles.logolink} href="/">
				<div className={Styles.monogram}>Por</div>
			</a>

			<a className={Styles.link} href="#about">
				About
			</a>
			
			<a className={Styles.link} href="#interests">
				Interests
			</a>
			
			<a className={Styles.link} href="#projects">
				Project
			</a>
			<a className={Styles.link} href="#skills">
				Skills
			</a>
			<a className={Styles.link} href="#contact">
				Contact
			</a>
			
			<a className={Styles.social} href="https://www.facebook.com/prachak.mathematics" target="_blank">
				<img className={Styles.socialicon} src = "https://www.facebook.com/images/fb_icon_325x325.png" sizes="0 0 16 16" />
			</a>
			<a className={Styles.social} href="https://github.com/PrachakTocheewee" target="_blank">
				<img className={Styles.socialicon} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/128px-Github-desktop-logo-symbol.svg.png?20200316183539" sizes="0 0 16 16" />
			</a>
			<a className={Styles.social} href="https://www.linkedin.com/in/prachak-tocheewee-405475245/" target="_blank">
				<img className={Styles.socialicon} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" sizes="0 0 16 16" />
			</a>
		</nav>
	);
}
export default Nav;
