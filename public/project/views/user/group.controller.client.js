/**
 * Created by shraddha on 12/6/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("ViewGroupController", ViewGroupController);

    function ViewGroupController($routeParams, $location, UserService)
    {
        var vm = this;
        vm.message = "hello from group controller";
        var userId = $routeParams.uid;
        vm.userId = userId;
        var promise = UserService.viewGroup(userId);
        promise
            .success(function(user){
                vm.user = user;
                vm.group = user.group;
            })
            .error(function(error){
                console.log(error);
            })
    }

})();