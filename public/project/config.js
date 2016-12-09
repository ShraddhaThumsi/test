/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .config(Config);

    function Config($routeProvider){
        function checkLogin($q, UserService, $location, $rootScope){

            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(function (user){
                    console.log(user);
                   // $rootScope.currentUser = null;
                    if(user != '0'){
                        console.log(user);

                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                    else
                    {
                        deferred.reject();
                       // $location.url("/login");
                    }

                });
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

            .when("/user/reset", {
                templateUrl: "views/user/resetLogin.view.client.html",
                controller: "ResetController",
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


            /*.when("/user", {
                templateUrl: "views/recipe/recipeSearch.view.client.html",
                controller: "RecipeSearchController",
                controllerAs: "model"

            })*/

            .when("/user/myRecipes", {
                templateUrl: "views/recipe/myRecipes.view.client.html",
                controller: "MyRecipeController",
                controllerAs: "model"

            })
            .when("/user/recipeDetails/editRecipe/:rid", {
                templateUrl: "views/recipe/editBookMarkRecipe.view.client.html",
                controller: "EditBookmarkRecipe",
                controllerAs: "model"
            })

            .when("/user/recipeDetails/:rid", {
                templateUrl: "views/recipe/recipeDetails.view.client.html",
                controller: "RecipeDetailsController",
                controllerAs: "model"
            })

            .when("/user/viewInbox", {
                templateUrl: "views/user/inbox.view.client.html",
                controller: "ViewInboxController",
                controllerAs: "model"
            })

            .when("/user/admin", {
                templateUrl: "views/user/admin.view.client.html",
                controller: "AdminRightsController",
                controllerAs: "model"
            })

            .otherwise({redirectTo: "/login"});



    }
})();