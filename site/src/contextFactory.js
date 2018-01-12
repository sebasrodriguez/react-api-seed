import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import config from './config';

const contextFactory = (fetch, insertCss) => {
	const client = new ApolloClient({
		link: new HttpLink({ uri: `${config.api.serverUrl}/graphql`, fetch }),
		cache: new InMemoryCache()
	});

	return {
		insertCss,
		graphQLClient: client
	};
};

export default contextFactory;
