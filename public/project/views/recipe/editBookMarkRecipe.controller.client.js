/**
 * Created by shraddha on 12/7/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("EditBookmarkRecipe", EditBookmarkRecipe);

    function EditBookmarkRecipe(RecipeService, $routeParams, $location)
    {
        var vm = this;
        var recipeId = $routeParams.rid;
        vm.recipeId = recipeId;
        console.log(recipeId + " recipe id from route params, seems to come from database");
        var userId = $routeParams.uid;
        vm.userId = userId;
        vm.editRecipe = editRecipe;
        vm.deleteRecipe = deleteRecipe;



        function init(){
            var promise = RecipeService.findBookMarkedRecipeById(userId, recipeId);
            promise
                .success(function(recipe){
                    vm.recipe = recipe;
                    console.log(vm.recipe);
                })
        }

        init();

        function editRecipe(recipeId, recipe)
        {
            vm.recipeId = recipeId;
            vm.recipe = recipe;
           // console.log(vm.recipe)
            var promise = RecipeService.updateBookMarkedRecipeById(vm.userId, vm.recipeId, vm.recipe);
            promise
                .success(function(updatedRecipe){
                    vm.recipe = updatedRecipe;
                    $location.url("/user/" + userId + "/myRecipes");
                })
                .error(function(){})
        }

        function deleteRecipe(recipeId)
        {
            vm.recipeId = recipeId;
            var promise = RecipeService.deleteBookMarkedRecipeById(vm.userId, vm.recipeId);
            promise
                .success(function(){
                    $location.url("/user/" + userId + "/myRecipes");
                })
                .error(function(error){
                    console.log(error);
                })
        }





    }
})();