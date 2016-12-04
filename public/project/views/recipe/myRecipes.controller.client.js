/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("MyRecipeController", MyRecipeController);

    function MyRecipeController($routeParams, RecipeService, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;


    }
})();