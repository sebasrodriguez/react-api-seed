import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';

import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import App from './components/App';
import Html from './components/Html';
import router from './router';
import config from './config';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.scss';

const app = express();

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
console.log(path.resolve(__dirname, 'assets'));
app.use(express.static(path.resolve(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*', async (req, res, next) => {
	try {
		const css = new Set();
		const context = {
			insertCss: (...styles) => { styles.forEach(style => css.add(style._getCss())); }
		};

		const route = await router.resolve({
			...context,
			pathname: req.path,
			query: req.query
		});

		if (route.redirect) {
			res.redirect(route.status || 302, route.redirect);
			return;
		}

		const data = { ...route };
		data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
		data.styles = [{ id: 'css', cssText: [...css].join('') }];
		data.scripts = [assets.vendor.js];
		if (route.chunks) {
			data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
		}
		data.scripts.push(assets.client.js);
		data.app = {
			apiUrl: config.api.clientUrl
		};

		const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
		res.status(route.status || 200);
		res.send(`<!doctype html>${html}`);
	} catch (err) {
		next(err);
	}
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.error(pe.render(err));
	const html = ReactDOM.renderToStaticMarkup(
		<Html
			title="Internal Server Error"
			description={err.message}
			styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
		>
			{ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
		</Html>,
	);
	res.status(err.status || 500);
	res.send(`<!doctype html>${html}`);
});

if (!module.hot) {
	app.listen(config.port, () => {
		console.info(`The server is running at http://localhost:${config.port}/`);
	});
} else {
	app.hot = module.hot;
	module.hot.accept('./router');
}

export default app;
