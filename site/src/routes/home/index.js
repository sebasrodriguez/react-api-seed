import React from 'react';
import gql from 'graphql-tag';

import Home from './Home';
import Layout from '../../components/Layout';

async function action({ graphQLClient }) {
	const query = gql`
		query users {
			users {
				id
				name
			}
		}
	`;

	graphQLClient.query({ query })
		.then((res) => {
			console.log(res);
		});

	// const resp = await fetch('/graphql', {
	// 	body: JSON.stringify({ query: '{users{id,name}}' })
	// });

	// const { data } = await resp.json();
	// const resp = await fetch('/test');
	// const { data } = await resp.json();

	// console.log(data);
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
