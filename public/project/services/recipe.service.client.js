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
            getRecipeByUri: getRecipeByUri

        };
        return api;

        function getRecipeByQueryName(queryName)
        {
            return $http
                .get("https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q="
                    + queryName)
        }

        function getRecipeByUri(uri)
        {
            var apiCallString = "http://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&r=";
            var recipeUriHash = uri;
            var recipeUri = recipeUriHash.replace("#", "%23");
            var finalUri = apiCallString + recipeUri;
            return $http.get(finalUri);
        }


    }

})();
