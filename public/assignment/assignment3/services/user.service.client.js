/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var idGenerator = 700;
        console.log(idGenerator);

        var users = [
            {_id: "123", username: "alice", password: "alice",
                firstName: "Alice", lastName: "Wonder", email: "alice@wonderland.com"},
            {_id: "234", username: "bob", password: "bob",
                firstName: "Bob", lastName: "Marley", email: "bob@marley.com"},
            {_id: "345", username: "charly", password: "charly",
                firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi",
                firstName: "Jose", lastName: "Annunzi", email: "jose@annunzi.com"}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser

        };
        return api;

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username
                    && user.password === password) {
                    console.log(user);
                    return user;
                }
            }
            return null;
        }

        function findUserById(userId) {
            for (var u in users) {
                var user = users[u];
                if (parseInt(user._id) === userId) {
                    console.log(user);
                    return user;
                }
            }
            return null;
        }

        function generateNewId() {

        }

        function createUser(newUser) {
            //while(true) {
            var userExists = false;

            /*var tempoDatabase = users;*/

            for (var u in users) {
                var user = users[u];
                if (user.username === newUser.username) {
                    userExists = true;
                    return null;
                }
            }


            /*userExists = false;*/
            var newUser = {
                _id: (idGenerator + 1).toString(),
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            };
            /*console.log("user id" + idGenerator);*/
            users.push(newUser);
            /*console.log(newUser);*/
            console.log("user id" + newUser._id);
            console.log("updated list of users: " + users);
            return newUser;
                /*tempoDatabase = tempoDatabase.push(newUser);
                 return tempoDatabase;*/
        }

        function findUserByUsername(username) {
            var user = null;
            for (var u in users) {
                user = users[u];
                if (user.username === username) {
                    console.log(user);
                    return user;
                }
            }
            console.log(user);
            return user;
        }

        function updateUser(userId, newUser) {
            var user;
            for (var u in users) {
                user = users[u];
                if (parseInt(user._id) === userId) {
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    user.email = newUser.email;
                    console.log(user);
                    return user;
                }
            }

            /*console.log(user);*/
            return user;
        }

        function deleteUser(userId)
        {
            //while(true) {
            var userExists = false;

            /*var tempoDatabase = users;*/

            var deletedUser;

            for (var u in users) {
                var user = users[u];
                if (user._id === userId) {
                    userExists = true;
                    deletedUser = user;
                    users.pop();
                    return null;
                }
            }


            /*userExists = false;*/
            /*var newUser = {
                _id: (idGenerator + 1).toString(),
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            };*/
            /*console.log(idGenerator);*/

            /*console.log(newUser);*/
            /*console.log(newUser._id);*/
            console.log(users);
            return deletedUser;
            /*tempoDatabase = tempoDatabase.push(newUser);
             return tempoDatabase;*/
        }
    }
})();