import {Router} from 'express';
import {buildSchema} from 'graphql';
import graphqlHTTP from 'express-graphql';

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
            return [
                {
                    id: 1,
                    name: "Victoria Lavella"
                },
                {
                    id: 2,
                    name: "Sebastián Pereira"
                },
                {
                    id: 3,
                    name: "Sebastián Rodríguez"
                }
            ];
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
