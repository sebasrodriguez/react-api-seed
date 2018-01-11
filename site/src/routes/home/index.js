import React from 'react';

import Home from './Home';
import Layout from '../../components/Layout';

const action = () => (
	{
		chunks: ['home'],
		title: '',
		component: (
			<Layout>
				<Home />
			</Layout>
		)
	}
);

export default action;
