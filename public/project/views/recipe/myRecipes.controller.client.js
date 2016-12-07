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
        /*vm.findAllRecipesForUser = findAllRecipesForUser;
        function findAllRecipesForUser(userId)
        {

        }*/
        /*function init()
        {
            var promise = RecipeService.findAllRecipesForUser(vm.userId);
            promise
                .success(function(recipes){
                    vm.recipes = recipes;
                    console.log(recipes);
                })
                .error(function(error){
                    console.log(error);
                })
        }
        init();*/

        function init()
        {
            var promise = RecipeService.findAllRecipesForUser(vm.userId);
            promise
                .success(function(user){
                    vm.recipes = user.recipes;
                    console.log(recipes);
                })
                .error(function(error){
                    console.log(error);
                })
        }
        init();


    }
})();