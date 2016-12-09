/**
 * Created by shraddha on 12/8/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("AdminRightsController", AdminRightsController);

    function AdminRightsController(UserService, $routeParams, $location, $rootScope)
    {
        var vm = this;
        if($rootScope.currentUser){
        var userId =  $rootScope.currentUser._id;
        vm.userId = userId;
        }

        var message = "welcome to admin rights page";
        vm.message = message;
        function init()
        {
            var promise = UserService.getAllUsers($rootScope.currentUser);
            promise
                .success(function(users){
                    vm.users = users;
                })
        }
        init();
    }
})();