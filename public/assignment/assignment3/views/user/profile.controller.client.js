/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        console.log(vm.userId);
        function init()
        {
        var promise = UserService.findUserById(vm.userId);
            promise
            .success(function user(user){


            if(user != '0'){
                vm.user = user;
                console.log("found user");
            }
        })
            .error(function(aaa){
                console.log(aaa);
            })
        }
        init();

        vm.updateUser = updateUser;
        function updateUser()
        {
            console.log(vm.user);
            var promise = UserService.updateUser(userId, vm.user);
            promise
                .success(function(updatedUser)
                {
                    $location.url("/user/" + userId);
                    vm.success = "Your profile was successfully saved."
                })
                .error(function(error){
                    console.log(error);
                })



        }




        vm.deleteUser = deleteUser;
        function deleteUser()
        {

            var promise = UserService.deleteUser(vm.user._id);
           // console.log(vm.user._id);
           // console.log("above is the user id sent from profile controller, to the database, for fetching user by id");

            promise
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                })

        }

    }
})();