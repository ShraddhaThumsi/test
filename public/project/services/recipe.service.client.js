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
            getRecipeByUri: getRecipeByUri

        };
        return api;

        function getRecipeByUri(recipe)
        {





        }
    }

})();