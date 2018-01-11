import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from '../../assets/images/logo-small.png';
import logoUrl2x from '../../assets/images/logo-small@2x.png';

const Header = () => (
	<div className={s.root}>
		<div className={s.container}>
			<Navigation />
			<Link className={s.brand} to="/">
				<img src={logoUrl} srcSet={`${logoUrl2x} 2x`} width="38" height="38" alt="React" />
				<span className={s.brandTxt}>Your Company</span>
			</Link>
			<div className={s.banner}>
				<h1 className={s.bannerTitle}>React</h1>
				<p className={s.bannerDesc}>Complex web apps made easy</p>
			</div>
		</div>
	</div>
);

export default withStyles(s)(Header);
