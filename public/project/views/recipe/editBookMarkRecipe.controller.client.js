/**
 * Created by shraddha on 12/7/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("EditBookmarkRecipe", EditBookmarkRecipe);

    function EditBookmarkRecipe(RecipeService, $routeParams, $location, $rootScope)
    {
        var vm = this;
        if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
        }

       // console.log(recipeId + " recipe id from route params, seems to come from database");

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
            var promise = RecipeService.updateBookMarkedRecipeById(vm.userId, vm.recipeId, vm.recipe);
            promise
                .success(function(updatedRecipe){
                    vm.recipe = updatedRecipe;
                    $location.url("/user/myRecipes");
                })
                .error(function(){})
        }

        function deleteRecipe(recipeId)
        {
            vm.recipeId = recipeId;
            var promise = RecipeService.deleteBookMarkedRecipeById(vm.userId, vm.recipeId);
            promise
                .success(function(){
                    $location.url("/user/myRecipes");
                })
                .error(function(error){
                    console.log(error);
                })
        }





    }
})();