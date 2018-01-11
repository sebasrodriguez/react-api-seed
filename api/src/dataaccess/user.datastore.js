import { BaseStore } from './base.datastore';

export class UserStore extends BaseStore {
    constructor() {
        super("users");
    }

    all() {
        return this.table.select();
    }
}