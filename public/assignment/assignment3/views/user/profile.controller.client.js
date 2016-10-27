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
        vm.userId = userId;
        function init()
        {
        var promise = UserService.findUserById(userId);
        promise
            .success(function user(user){


            if(user != '0'){
                vm.user = user;
                console.log("found user");
            }
        })
            .error(function(){
                
            })
        }
        init();

        vm.updateUser = updateUser;
        function updateUser(username,email,firstName,lastName){
            var updatedUser = UserService.updateUser(username,email,firstName,lastName);

            $location.url("/user/" + userId);}

            vm.deleteUser = deleteUser;
        function deleteUser(userId)
        {
            console.log(userId);
            var result = UserService.deleteUser(userId);
            console.log(result);
            if(result)
            {
                $location.url("/login");

            }
            else
            {
                vm.error = "Unable to delete user profile";
            }

        }

    }
})();