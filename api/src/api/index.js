import {Router} from 'express';
import graphqlHTTP from 'express-graphql';

import rootQuery from '../graphql/root.query';
import rootSchema from '../graphql/root.schema';

const isProductionMode = process.env.NODE_ENV === 'production';
const graphql = graphqlHTTP((request) => ({
    schema: rootSchema,
    rootValue: rootQuery,
    graphiql: !isProductionMode,
    context: {
        request,
        isProductionMode
    }
}));

export default () => {
    let api = Router();

    api.use('/graphql', graphql);

    return api;
}
