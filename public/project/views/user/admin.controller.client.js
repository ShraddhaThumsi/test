/**
 * Created by shraddha on 12/8/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("AdminRightsController", AdminRightsController);

    function AdminRightsController(UserService, $routeParams, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        var message = "welcome to admin rights page";
        vm.message = message;
    }
})();