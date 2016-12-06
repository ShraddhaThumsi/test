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
            getRecipeById: getRecipeById

        };
        return api;

        function getRecipeByQueryName(queryName)
        {
            return $http
                .get("https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q="
                    + queryName)
        }

        function getRecipeById(recipeId)
        {
            var apiCallString = "http://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8" +
                "&r=http://www.edamam.com/ontologies/edamam.owl%23";
            var recipeId = recipeId;
            var requestRecipeDetails = apiCallString + recipeId;
            return $http.get(requestRecipeDetails);

        }


    }

})();
