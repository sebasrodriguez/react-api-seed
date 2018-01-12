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

	const response = await graphQLClient.query({ query });
	console.log(response.data.users);

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
