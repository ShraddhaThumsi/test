/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login
            //checkLogin: checkLogin

        };
        return api;

        /*function checkLogin(){
            return $http.post("/api/checkLogin")
        }*/

        function login(username, password)
        {
            var user = {
                username: username,
                password: password
            };

            return $http.post("/api/login", user);
        }

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
            /*var user = null;
            for (var u in users) {
                user = users[u];
                if (user.username === username) {
                    console.log(user);
                    return user;
                }
            }
            console.log(user);
            return user;*/
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url, user);

        }

        function deleteUser(userId)
        {
            var url = "/api/user/"+userId;
            return $http.delete(url);


        }
    }
})();