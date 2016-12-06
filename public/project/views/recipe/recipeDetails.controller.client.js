/**
 * Created by shraddha on 12/3/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RecipeDetailsController", RecipeDetailsController);

    function RecipeDetailsController($routeParams, RecipeService)
    {
        var vm = this;
        var recipeID = $routeParams.rid;
        console.log(recipeID);
        function init(){
        var promise = RecipeService.getRecipeById(recipeID);
        promise
            .success(function(recipe){
                vm.recipe = recipe[0];
                console.log(vm.recipe.image);
                console.log(recipe);
            })
        }

        init();

        vm.bookMark = bookMark;
        function bookMark()
        {

            console.log("will bookmark this recipe upon clicking");
        }


    }
})();