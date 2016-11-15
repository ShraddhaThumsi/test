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
            .error(function(aaa){
                console.log(aaa);
            })
        }
        init();

        vm.updateUser = updateUser;
        function updateUser()
        {
            var updatedUser = UserService.updateUser(userId, vm.user);


            $location.url("/user/" + userId);
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

    }
})();