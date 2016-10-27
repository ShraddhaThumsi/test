/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var idGenerator = 700;
        console.log(idGenerator);


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
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);

        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);

        }

        function generateNewId() {

        }

        function createUser(newUser) {
            return $http.post("/api/user", newUser);
            //while(true) {
            /*var userExists = false;

            /!*var tempoDatabase = users;*!/

            for (var u in users) {
                var user = users[u];
                if (user.username === newUser.username) {
                    userExists = true;
                    return null;
                }
            }


            /!*userExists = false;*!/
            var newUser = {
                _id: (idGenerator + 1).toString(),
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            };
            /!*console.log("user id" + idGenerator);*!/
            users.push(newUser);
            /!*console.log(newUser);*!/
            console.log("user id" + newUser._id);
            console.log("updated list of users: " + users);
            return newUser;
                /!*tempoDatabase = tempoDatabase.push(newUser);
                 return tempoDatabase;*!/*/
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
            var i;
            var found = false;
            for(i in users)
            {
                console.log(typeof users[i]._id);
                console.log(typeof userId);
                if(users[i]._id.toString() === userId.toString())
                {
                    console.log(users);
                    found = true;
                    break;
                }
            }

            if(found)
            {
                console.log(i);
                users.splice(i,1);
                return true;
            }
            return false;
        }
    }
})();