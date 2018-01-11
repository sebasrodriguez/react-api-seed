import React from 'react';

import Home from './Home';
import Layout from '../../components/Layout';

async function action( /*{ fetch }*/ ) {
	// const resp = await fetch('/graphql', {
	// 	body: JSON.stringify({ query: 'una query' })
	// });

	// const { data } = await resp.json();
	return {
		chunks: ['home'],
		title: '',
		component: (
			<Layout>
				<Home />
			</Layout>
		)
	};
}

export default action;
