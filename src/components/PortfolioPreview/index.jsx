import { h } from 'preact';
import Styles from './styles.module.scss';

function PortfolioPreview() {
	//const { frontmatter } = project;
	return (
		<div className="card">
			<div className="titleCard" style="">
				<h1 className="title">Find Your Hat</h1>
			</div>
			<div className="pa3">
				<p className="desc" >Interactive terminal game that the player has lost their
hat and they must navigate back to it without falling in to
the holes</p>
				<div className={Styles.tags}>
					Tagged:
					{frontmatter.tags.map((t) => (
						<div className={Styles.tag} data-tag={t}>
							{t}
						</div>
					))}
				</div>
				<a className={Styles.link} href={project.url}>
					<span className={Styles.linkInner}>View</span>
				</a>
			</div>
		</div>
	);
}

export default PortfolioPreview;
