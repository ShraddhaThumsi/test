/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .config(Config);

    function Config($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user/:uid/reset", {
                templateUrl: "views/user/resetLogin.view.client.html",
                controller: "ResetController",
                controllerAs: "model"
            })

            .when("/user/:uid", {
                templateUrl: "views/recipe/recipeSearch.view.client.html",
                controller: "RecipeSearchController",
                controllerAs: "model"
            })

            .when("/user/:uid/myRecipes", {
                templateUrl: "views/recipe/myRecipes.view.client.html",
                controller: "MyRecipeController",
                controllerAs: "model"
            })

            /*.when("/guestRecipeSearch", {
                templateUrl: "views/recipe/recipeSearch.view.client.html"
            })*/

            .otherwise({redirectTo: "/login"});

    }
})();