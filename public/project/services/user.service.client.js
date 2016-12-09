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
            getAllUsers: getAllUsers
        };
        return api;

        function checkLogin()
        {
            return $http.post("/project/checkLogin")
        }

        function logout()
        {
            return $http.post("/project/logout");
        }

        function login(email, password)
        {
            var user =
            {
                username: email,
                password: password
            };

            return $http.post("/project/login", user);
        }
        function createUser(newUser)
        {
            return $http.post("/project/user", newUser);
        }

        function findUserByCredentials(email, password) {
            var url = "/project/user?email="+email+"&password="+password;
            return $http.get(url);

        }

        function findUserById(userId)
        {
            var url = "/project/user/" + userId;
            return $http.get(url);
        }

        function updateUser(userId, user){
            var url = "/project/user/"+userId;
            return $http.put(url, user);
        }

        function deleteUser(userId)
        {
            var url = "/project/user/"+userId;
            return $http.delete(url);
        }

        function viewInbox(userId)
        {
            var url = "/project/user/"+userId;
            return $http.get(url);
        }

        function sendEmail(userId, popularUserId, message)
        {
            console.log(userId + " current user id");
            console.log(popularUserId + " receiver user id");
            var url = "/project/user/" + userId + "/receiver/" + popularUserId;
            return $http.put(url, {message:message});
        }

        function getAllUsers(user){
            console.log(user + " user object, reporting from user service client, this has been received from admin rights controller");
            var url = "/project/admin/users";
            return $http.get(url, user);
        }

    }
})();