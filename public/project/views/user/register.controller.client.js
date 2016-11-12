/**
 * Created by shraddha on 11/11/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController()
    {
        var vm = this;
        console.log("hello from register controller");
    }
})();