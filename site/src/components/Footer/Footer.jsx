import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Footer.scss';

const Footer = () => (
	<div className={s.root}>
		<div className={s.container}>
			<span className={s.text}>© Your Company</span>
		</div>
	</div>
);

export default withStyles(s)(Footer);
