/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService(){
        var users = [
            {username: 'alice', password: 'ewq', _id: 123, first: 'Alice', last: 'Wonderland', email: 'alice@wonderland.com'},
            {username: 'bob', password: 'ewq', _id: 234, first: 'Bob', last: 'Marley', email: 'bob@marley.com'},
            {username: 'charlie', password: 'ewq', _id: 345, first: 'Charlie', last: 'Garcia', email: 'charlie@garcia.com'}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById
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

})();