/**
 * Created by shraddha on 11/18/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController()
    {
        var vm = this;

        vm.SignUp = SignUp;
        function SignUp()
        {
            console.log("hello from register controller");
        }
    }
})();