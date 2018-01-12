import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const contextFactory = (fetch, insertCss) => {
	const client = new ApolloClient({
		link: new HttpLink({ uri: 'http://localhost:8080/graphql', fetch }),
		cache: new InMemoryCache()
	});

	return {
		insertCss,
		graphQLClient: client
	};
};

export default contextFactory;
