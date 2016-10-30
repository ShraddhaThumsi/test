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


        function createUser(newUser) {
            return $http.post("/api/user", newUser);

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

        function updateUser(user) {
            var url = "/api/user/"+user._id;
            $http.put(url, user);

        }

        function deleteUser(userId)
        {
            var url = "/api/user/"+userId;
            return $http.delete(url);


        }
    }
})();