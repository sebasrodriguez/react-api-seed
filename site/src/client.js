import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';

import { createPath } from 'history/PathUtils';
import App from './components/App';
import history from './history';
import { updateMeta } from './DOMUtils';
import router from './router';
import contextFactory from './contextFactory';

const insertCss = (...styles) => {
	// eslint-disable-next-line no-underscore-dangle
	const removeCss = styles.map(x => x._insertCss());
	return () => { removeCss.forEach(f => f()); };
};
const context = contextFactory(fetch, insertCss);

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

// Switch off the native scroll restoration behavior and handle it manually
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
	window.history.scrollRestoration = 'manual';
}

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
	// Remember the latest scroll position for the previous location
	scrollPositionsHistory[currentLocation.key] = {
		scrollX: window.pageXOffset,
		scrollY: window.pageYOffset
	};
	// Delete stored scroll position for next page if any
	if (action === 'PUSH') {
		delete scrollPositionsHistory[location.key];
	}
	currentLocation = location;
	const isInitialRender = !action;
	try {
		const route = await router.resolve({
			...context,
			pathname: location.pathname,
			query: queryString.parse(location.search)
		});

		// Prevent multiple page renders during the routing process
		if (currentLocation.key !== location.key) {
			return;
		}

		if (route.redirect) {
			history.replace(route.redirect);
			return;
		}

		const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
		appInstance = renderReactApp(
			<App context={context}>{route.component}</App>,
			container,
			() => {
				if (isInitialRender) {
					const elem = document.getElementById('css');
					if (elem) elem.parentNode.removeChild(elem);
					return;
				}

				document.title = route.title;
				updateMeta('description', route.description);
				let scrollX = 0;
				let scrollY = 0;
				const pos = scrollPositionsHistory[location.key];
				if (pos) {
					scrollX = pos.scrollX;
					scrollY = pos.scrollY;
				} else {
					const targetHash = location.hash.substr(1);
					if (targetHash) {
						const target = document.getElementById(targetHash);
						if (target) {
							scrollY = window.pageYOffset + target.getBoundingClientRect().top;
						}
					}
				}

				window.scrollTo(scrollX, scrollY);

				if (window.ga) {
					window.ga('send', 'pageview', createPath(location));
				}
			}
		);
	} catch (error) {
		if (__DEV__) {
			throw error;
		}

		console.error(error);

		// Do a full page reload if error occurs during client-side navigation
		if (!isInitialRender && currentLocation.key === location.key) {
			window.location.reload();
		}
	}
}

// Handle client-side navigation by using HTML5 History API
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
	module.hot.accept('./router', () => {
		if (appInstance && appInstance.updater.isMounted(appInstance)) {
			// Force-update the whole tree, including components that refuse to update
			deepForceUpdate(appInstance);
		}
		onLocationChange(currentLocation);
	});
}
