/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {


        var users = [
            {_id: 123, username: "alice", password: "alice",
                firstName: "Alice", lastName: "Wonder", email: "alice@wonderland.com"},
            {_id: 234, username: "bob", password: "bob",
                firstName: "Bob", lastName: "Marley", email: "bob@marley.com"},
            {_id: 345, username: "charly", password: "charly",
                firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com"},
            {_id: 456, username: "jannunzi", password: "jannunzi",
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
                if (user._id === userId) {
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
                var idGenerator = 700;
                /*var tempoDatabase = users;*/

                for (var u in users) {
                    var user = users[u];
                    if (user.username === newUser.username
                        && user.password === newUser.password) {
                        userExists = true;
                        return userExists;
                    }

                    else {
                        userExists = false;
                        var newUser = {
                            _id: idGenerator + 1,
                            username: newUser.username,
                            password: newUser.password,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email
                        };
                        users.push(newUser);
                        console.log(user);
                        return user;
                        /*tempoDatabase = tempoDatabase.push(newUser);
                         return tempoDatabase;*/
                    }

                }

                /*return tempoDatabase;*/
                console.log(users);
                return users;
            //}
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
                if (user._id === userId) {
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    user.email = newUser.email;
                    console.log(user);
                    return user;
                }
            }

            console.log(user);
            return user;
        }

        function deleteUser(userId)
        {
            var user;
            for(var u in users)
            {
                user = users[u];
                if(user._id === userId)
                {
                    users.remove(user);
                    console.log(users);
                }

            }
            console.log(users);
            return users;
        }
    }
})();