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
            findUserById: findUserById,
            login: login,
            checkLogin: checkLogin,
            logout: logout,
            viewInbox: viewInbox,
            sendEmail: sendEmail,
            findAllUsers: findAllUsers
        };
        return api;

        function checkLogin()
        {
            return $http.post("/api/checkLogin")
        }

        function logout()
        {
            return $http.post("/api/logout");
        }

        function login(email, password)
        {
            var user =
            {
                email: email,
                password: password
            };

            return $http.post("/api/login", user);
        }
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

        function viewInbox(userId)
        {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function sendEmail(userId, popularUserId, message)
        {
            console.log(userId + " current user id");
            console.log(popularUserId + " receiver user id");
            var url = "/api/user/" + userId + "/receiver/" + popularUserId;
            return $http.put(url, {message:message});
        }

        function findAllUsers(){
            var url = "/api/user/getAllUsers";
            return $http.get(url);
        }

    }
})();