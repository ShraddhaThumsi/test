/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RecipeSearchController", RecipeSearchController);

    function RecipeSearchController($routeParams, RecipeService, $rootScope) {
        var vm = this;
        if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
        }

        vm.loadDoc = loadDoc;


        function loadDoc(queryName) {
            console.log("You have asked for recipes on: " +  queryName);
            vm.queryName = queryName;
            var recipe = null;


            var promise = RecipeService.getRecipeByQueryName(queryName);
            promise
                .success(function (result) {
                    console.log(result);
                    var recipes = result.hits;
                    vm.recipes = recipes;
                    var uriTempo = recipes[0].recipe.uri;
                    console.log(uriTempo);
                    var uri = uriTempo.split("#");
                    var rid = uri[1];
                    vm.rid = rid;
                    console.log(uri);
                    console.log(rid);

                })
                .error(function(error)
                {
                    console.log(error);
                });

        }

    }
})();