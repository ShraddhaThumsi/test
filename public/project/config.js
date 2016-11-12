/**
 * Created by shraddha on 11/9/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .config(Config);

    function Config($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/loginSignup.view.client.html",
                controller: "LoginSignupController",
                controllerAs: "model"
            })
            .when("/user/:uid/myRecipes", {
                templateUrl: "views/recipe/userRecipe.view.client.html",
                controller: "UserRecipeController",
                controllerAs: "model"
            })
            .when("/user/:uid/uploadRecipe", {
                templateUrl: "/views/recipe/addRecipeFromMemory.view.client.html",
                controller: "UploadRecipeController",
                controllerAs: "model"
            })
            .when("/user/:uid/recipeSearch", {
                templateUrl: "/views/recipe/recipeSearchEngine.view.client.html",
                controller: "RecipeSearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/resetCredentials", {
                templateUrl: "/views/user/updateUser.view.client.html",
                controller: "UpdateUserController",
                controllerAs: "model"
            })
            .when("/signup", {
                templateUrl: "/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .otherwise({redirectTo: "/login"});
    }
})();