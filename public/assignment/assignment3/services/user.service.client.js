/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService(){
        var users = /*[
            {username: 'alice', password: 'ewq', _id: 123, first: 'Alice', last: 'Wonderland', email: 'alice@wonderland.com'},
            {username: 'bob', password: 'ewq', _id: 234, first: 'Bob', last: 'Marley', email: 'bob@marley.com'},
            {username: 'charlie', password: 'ewq', _id: 345, first: 'Charlie', last: 'Garcia', email: 'charlie@garcia.com'}
        ];*/

        [
            {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername ,
            updateUser: updateUser,
            deleteUser: deleteUser

        };
        return api;

        function findUserById(userId){
            for(var u in users) {
                var user = users[u];
                if (user._id === userId) {
                    console.log(user);
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password)
        {
            for(var u in users) {
                var user = users[u];
                if (user.username === username
                    && user.password === password) {
                    console.log(user);
                    return user;
                }
            }
                return null;
            }
        }

        function createUser(user)
        {

        }

        function findUserByUsername(username)
        {

        }

        function updateUser(userId, user)
        {

        }

        function deleteUser(userId)
        {

        }

})();