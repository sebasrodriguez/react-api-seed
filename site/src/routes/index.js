/* eslint-disable global-require */

const routes = {
	path: '',
	children: [
		{
			path: '',
			load: () => import(/* webpackChunkName: 'home' */ './home')
		},
		{
			path: '/contact',
			load: () => import(/* webpackChunkName: 'contact' */ './contact')
		},
		{
			path: '(.*)',
			load: () => import(/* webpackChunkName: 'not-found' */ './not-found')
		}
	],
	async action({ next }) {
		// Execute each child route until one of them return the result
		const route = await next();
		route.title = route.title || '';
		route.description = route.description || '';
		return route;
	}
};

// The error page is available by permanent url for development mode
if (__DEV__) {
	routes.children.unshift({
		path: '/error',
		action: require('./error').default
	});
}

export default routes;
