/**
 * Created by shraddha on 11/28/16.
 */


(function(){
    angular
        .module("RecipeMaker")
        .factory("RecipeService", RecipeService);

    function RecipeService($http)
    {
        var api = {

            getRecipeByQueryName: getRecipeByQueryName,
            getRecipeById: getRecipeById,
            bookMarkRecipe: bookMarkRecipe,
            findAllRecipesForUser: findAllRecipesForUser,
            findBookMarkedRecipeById: findBookMarkedRecipeById,
            updateBookMarkedRecipeById: updateBookMarkedRecipeById,
            deleteBookMarkedRecipeById: deleteBookMarkedRecipeById,

        };
        return api;

        function getRecipeByQueryName(queryName)
        {
            var url = "/api/user/recipeSearch/" + queryName;
            return $http.get(url);
        }

        function getRecipeById(recipeId)
        {

            var url = "/api/user/recipeDetails/" + recipeId;
            return $http.get(url);

        }

        function bookMarkRecipe(userId, sourceRecipe, chefNotes)
        {
            console.log(userId + " userId from recipe service client");
            var recipe = {
                chefNotes: chefNotes,
                recipe: sourceRecipe
            };

            console.log(recipe + " recipe with chef notes from recipe service client");

            return $http.post("/api/user/" + userId + "/bookMarkRecipe", recipe);

        }

        function findAllRecipesForUser(userId){
            var url = "/api/user/" + userId + "/myRecipes";
            return $http.get(url);
        }


        function findBookMarkedRecipeById(userId, recipeId){
            var url = "/api/user/" + userId + "/bookMarkedRecipe/" + recipeId;
            return $http.get(url);
        }

        function updateBookMarkedRecipeById(userId, recipeId, recipe){
            var url = "/api/user/" + userId + "/editRecipe/" + recipeId;
            return $http.put(url, recipe);
        }

        function deleteBookMarkedRecipeById(userId, recipeId){
            var url = "/api/user/" + userId + "/deleteBookMarkedRecipe/" + recipeId;
            return $http.delete(url);

        }


    }

})();
