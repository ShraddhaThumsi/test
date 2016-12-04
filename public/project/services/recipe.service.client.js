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
            findRecipeByUri: findRecipeByUri

        };
        return api;

        function findRecipeByUri()
        {

        }
    }

})();
