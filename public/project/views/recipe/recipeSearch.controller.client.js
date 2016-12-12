/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RecipeSearchController", RecipeSearchController);

    function RecipeSearchController($routeParams, RecipeService, $rootScope, $location, UserService) {
        var vm = this;
        var isAdmin = false;
        vm.isAdmin = isAdmin;
        var isArrayEmpty = true;
        vm.isArrayEmpty = isArrayEmpty;
        if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
        }

        if($rootScope.currentUser.role === "admin")
        {
            isAdmin = true;
            vm.isAdmin = isAdmin;
        }

        vm.loadDoc = loadDoc;
        vm.logout = logout;


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
                    if(recipes.length > 0)
                    {
                        isArrayEmpty = false;
                        vm.isArrayEmpty = isArrayEmpty;
                    }
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

        function logout()
        {
            var promise = UserService.logout();
            promise
                .success(function(){
                    $location.url("/login")
                })
        }

    }
})();