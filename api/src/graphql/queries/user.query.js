import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import User from '../types/user.type';
import UserService from '../../services/user.service';

const userService = new UserService();

export default {
    user: {
        type: User,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(source, { id }) {
            return userService.get(id);
        }
    },
    users: {
        type: new GraphQLList(User),
        resolve(source) {
            return userService.all();
        }
    }
};
