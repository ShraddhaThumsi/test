/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .config(Config);

    function Config($routeProvider){
        function checkLogin($q, UserService){
         var deferred = $q.defer();
         UserService
         .checkLogin()
         .success(function(user){
         if(user)
         {
         deferred.resolve();
         }
         else
         {
         deferred.reject();
         }

         })

         return deferred.promise;

         }
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
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/user/:uid", {
                templateUrl: "views/recipe/recipeSearch.view.client.html",
                controller: "RecipeSearchController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/user", {
                templateUrl: "views/recipe/recipeSearch.view.client.html",
                controller: "RecipeSearchController",
                controllerAs: "model",
                resolve: {
                 checkLogin: checkLogin
                 }
            })

            .when("/user/:uid/myRecipes", {
                templateUrl: "views/recipe/myRecipes.view.client.html",
                controller: "MyRecipeController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/recipeDetails", {
                templateUrl: "views/recipe/recipeDetails.view.client.html",
                controller: "RecipeDetailsController",
                controllerAs: "model"
            })

            .otherwise({redirectTo: "/login"});



    }
})();