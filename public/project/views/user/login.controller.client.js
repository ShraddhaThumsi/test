/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("LoginController", LoginController);

    function LoginController()
    {
        var vm = this;
        vm.loginUser = loginUser();
        function loginUser()
        {
            console.log("hello from login controller");

        }

    }
})();