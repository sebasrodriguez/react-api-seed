import {GraphQLObjectType} from 'graphql';

import user from './queries/user.query';

export default new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ...user,
    })
});
