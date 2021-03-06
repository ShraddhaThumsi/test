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
       // if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
            console.log(userId + " this is the user id, reporting from recipe details controller");
        //}

        vm.bookMark = bookMark;

        function init(){
        var promise = RecipeService.getRecipeById(recipeID);
        promise
            .success(function(recipe){
                vm.recipe = recipe[0];
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
                    console.log(recipeExists);
                    if (recipeExists == true) {
                        alert("Recipe exists");
                    }

                    else {
                        recipeID = recipeExists._id;
                        vm.recipeID = recipeID;
                        vm.bookMark = recipeExists;
                        $location.url("/user/myRecipes");
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