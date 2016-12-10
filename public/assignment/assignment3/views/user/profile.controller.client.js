/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;
        if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
        }
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
                    $location.url("/user");
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
            promise
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                })

        }

        vm.logOut = logOut;
        function logOut()
        {
            var promise = UserService.logout();
            promise
                .success(function(response){
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }

    }
})();