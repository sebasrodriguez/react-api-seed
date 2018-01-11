import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        }
    })
});

export default User;
