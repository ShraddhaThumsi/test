/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        console.log(userId);
        var users = [
            {username: 'alice', password: 'ewq', _id: 123},
            {username: 'bob', password: 'ewq', _id: 234},
            {username: 'charly', password: 'ewq', _id: 345}
        ];
        for(var u in users)
        {
            var user = users[u];
            if(user._id === userId) {
                console.log(["found the user", user]);
            }
        }

    }
})();