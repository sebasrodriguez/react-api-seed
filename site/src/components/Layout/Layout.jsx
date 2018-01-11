import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';

import s from './Layout.scss';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => (
	<React.Fragment>
		<Header />
		{children}
		<Footer />
	</React.Fragment>
);

export default withStyles(normalizeCss, s)(Layout);
