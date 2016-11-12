/**
 * Created by shraddha on 11/11/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("LoginSignupController", LoginSignupController);

    function LoginSignupController()
    {
        var vm = this;
        console.log("hello from login signup controller");
    }
})();