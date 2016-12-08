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

            /*var url = "/api/recipeSearchByQuery";
            var queryBody =
            {queryByName: "https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q="
            + queryName};
            return $http.get(url, queryBody);*/
            /*return $http
                .get("https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q="
                    + queryName)*/
            var url = "/api/user/recipeSearch/" + queryName;
            return $http.get(url);
        }

        function getRecipeById(recipeId)
        {
            /*var url = "/api/recipeSearchById";
            var apiCallString = "https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8" +
            "&r=http://www.edamam.com/ontologies/edamam.owl%23";
            var recipeId = recipeId;
            var requestRecipeDetails = apiCallString + recipeId;
            var queryBody =
            {
                queryById: requestRecipeDetails
            }
            return $http.get(url, queryBody)*/
            var apiCallString = "https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8" +
                "&r=http://www.edamam.com/ontologies/edamam.owl%23";
            var recipeId = recipeId;
            var requestRecipeDetails = apiCallString + recipeId;
            return $http.get(requestRecipeDetails);

        }

        function bookMarkRecipe(userId, sourceRecipe, chefNotes)
        {
            var recipe = {
                chefNotes: chefNotes,
                recipe: sourceRecipe
            };

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
