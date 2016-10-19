/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var user = UserService.findUserById(userId);
        if(user != null){
            vm.user = user;
            console.log("found user");
        }

        vm.updateUser = updateUser;
        function updateUser(username,email,firstName,lastName){
            var updatedUser = UserService.updateUser(username,email,firstName,lastName);

            $location.url("/user/" + userId);}

        function deleteUser(userId)
        {var deletedUser = UserService.deleteUser(userId);
            console.log(deletedUser);
        }

    }
})();