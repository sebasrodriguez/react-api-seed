import { BaseStore } from './base.datastore';

export class TestStore extends BaseStore {
    constructor() {
        super("test");
    }

    all() {
        return this.table.select();
    }
}