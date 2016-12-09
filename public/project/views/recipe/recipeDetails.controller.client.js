/**
 * Created by shraddha on 12/3/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RecipeDetailsController", RecipeDetailsController);

    function RecipeDetailsController($routeParams, RecipeService, $location, $rootScope)
    {
        var vm = this;
        var recipeID = $routeParams.rid;
        console.log(recipeID);
        if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
        }

        vm.bookMark = bookMark;

        function init(){
        var promise = RecipeService.getRecipeById(recipeID);
        promise
            .success(function(recipe){
                vm.recipe = recipe[0];
              //  console.log(vm.recipe.image);
                console.log(vm.recipe);
            })
        }

        init();


        function bookMark(recipe, chefNotes)
        {

            vm.recipe = recipe;
            vm.chefNotes = chefNotes;
            console.log(chefNotes);

            var promise = RecipeService.bookMarkRecipe(userId, recipe, chefNotes);
            promise
                .success(function(recipeExists){
                    if (recipeExists == true) {
                        alert("Recipe exists");
                    }

                    else {var recipeId = recipeExists._id;
                        vm.bookMark = recipeExists;
                        $location.url("/user/" + vm.userId + "/myRecipes");
                    }
                })
                .error(function(aaa){
                    console.log(aaa);
                });
            console.log(recipe);
            console.log("will bookmark this recipe upon clicking");
        }


    }
})();