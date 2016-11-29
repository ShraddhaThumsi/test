/**
 * Created by shraddha on 11/28/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .factory("UserService", UserService);

    function UserService($http)
    {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserById: findUserById
        };
        return api;

        function createUser(newUser)
        {
            return $http.post("/api/user", newUser);
        }

        function findUserByCredentials(email, password) {
            var url = "/api/user?email="+email+"&password="+password;
            return $http.get(url);

        }

        function findUserById(userId)
        {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function updateUser(userId, user){
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