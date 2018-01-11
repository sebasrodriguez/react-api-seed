/* eslint-disable max-len */
module.exports = {
	port: process.env.PORT || 3000,
	api: {
		clientUrl: process.env.API_CLIENT_URL || '',
		serverUrl: process.env.API_SERVER_URL || 'http://localhost:8080'
	}
};
