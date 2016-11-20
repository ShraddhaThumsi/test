/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("ResetController", ResetController);

    function ResetController()
    {
        var vm = this;

        vm.updateUser = updateUser;
        function updateUser()
        {
            console.log("hello from reset login controller");
        }
    }
})();