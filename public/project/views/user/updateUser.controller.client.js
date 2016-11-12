/**
 * Created by shraddha on 11/11/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("UpdateUserController", UpdateUserController);

    function UpdateUserController()
    {
        var vm = this;
        console.log("hello from update user controller");
    }
})();