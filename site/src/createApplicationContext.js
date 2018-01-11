import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const context = (fetch) => {
	const client = new ApolloClient({
		link: new HttpLink({ uri: 'http://localhost:8080/graphql', fetch }),
		cache: new InMemoryCache()
	});

	return {
		insertCss: (...styles) => { styles.forEach(style => css.add(style._getCss())); },
		graphQLClient: client
	};
};

export default context;
