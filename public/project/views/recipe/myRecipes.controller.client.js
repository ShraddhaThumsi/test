/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("MyRecipeController", MyRecipeController);

    function MyRecipeController($routeParams, RecipeService, $location, $rootScope)
    {
        var vm = this;
        if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
        }


        function init()
        {
            var promise = RecipeService.findAllRecipesForUser(vm.userId);
            promise
                .success(function(user){
                    vm.recipes = user.recipes;
                    console.log(vm.recipes);
                })
                .error(function(error){
                    console.log(error);
                })
        }


    }
})();