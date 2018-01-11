const users = [
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

// TODO: connect this class to the userStore to retreive from DB
export default class UserService {

    all() {
        return users;
    }

    get(id) {
        return users.find((u) => u.id == id);
    }
}