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

        var recipeId = $routeParams.rid;
        vm.recipeId = recipeId;
        /*vm.editRecipe = editRecipe;
        vm.deleteRecipe = deleteRecipe;*/


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
        init();
/*
        function editRecipe(chefNotes)
        {
            vm.chefNotes = chefNotes;
            console.log("will allow user to edit/delete recipe");
        }

        function deleteRecipe(recipeId)
        {
            vm.recipeId = recipeId;
            console.log("deleting recipe no. " + recipeId);
        }*/


    }
})();