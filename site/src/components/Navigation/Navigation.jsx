import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Navigation.scss';
import Link from '../Link';

const Navigation = () => (
	<nav className={s.root}>
		<Link className={s.link} to="/contact"> Contact </Link>
	</nav>
);

export default withStyles(s)(Navigation);
