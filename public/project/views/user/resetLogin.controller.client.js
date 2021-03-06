/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("ResetController", ResetController);

    function ResetController($routeParams, $location, UserService, $rootScope)
    {
        var vm = this;
        if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
        }

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init()
        {
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function user(user){


                    if(user){
                        vm.user = user;
                        console.log("found user");
                    }
                })
                .error(function(aaa){
                    console.log(aaa);
                })
        }
        init();


        function updateUser(userId, user)
        {
            vm.userId = userId;
            vm.user = user;
            var promise = UserService.updateUser(userId, user);
            console.log(promise);
            promise
                .success(function(updatedUser)
                {
                    console.log(updatedUser)
                    $location.url("/user");
                    vm.user = updatedUser;
                    vm.success = "Your profile was successfully saved"
                })
                .error(function(error)
                {
                    console.log(error);
                })

        }

        function deleteUser(userId)
        {
            vm.userId = userId;
            var promise = UserService.deleteUser(userId);
            promise
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                })

        }

        function logout()
        {
            var promise = UserService.logout();
            promise
                .success(function(){
                    $location.url("/login")
                })
        }
    }
})();