import Knex from 'knex';

import config from '../config.json';
const knex = Knex(config.db);

export class BaseStore {
	constructor(tableName) {
        this.tableName = tableName;
	}

	get knex() {
		return knex;
	}

	get table() {
		return knex(this.tableName);
	}

	get(id) {
		return this.table
			.first('*')
			.where('id', id)
			.then((data) => (data || {}));
	}
}
