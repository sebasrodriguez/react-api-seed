import { Router } from 'express';
import { buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';

import { TestStore } from "../dataaccess/test.datastore";

export default () => {
    const schema = buildSchema(`
        type Query {
            test: [Test]
        }
        
        type Test {
            id: ID
            name: String
        }
    `);

    const root = {
        test: () => {
            const testStore = new TestStore();
            return testStore.all();
        }
    };

    let api = Router();

    api.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));

    return api;
}
