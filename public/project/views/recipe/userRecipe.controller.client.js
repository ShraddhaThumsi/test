/**
 * Created by shraddha on 11/11/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("UserRecipeController", UserRecipeController);


    function UserRecipeController()
    {
        var vm = this;
        console.log("hello from user recipe controller");
    }
})();