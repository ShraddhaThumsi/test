/**
 * Created by shraddha on 10/14/16.
 */
(function()
{
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            /*.when("/login", {
                templateUrl: "/views/user/login.view.client.html"
            })*/
            .when("/login", {
                templateUrl: "user/login.view.client.html"
            })
            .when("/", {
                templateUrl: "user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "user/profile.view.client.html"
            })
            .when("/website", {
                templateUrl: "website/website-list.view.client.html"
            })
            .when("/website/new", {
                templateUrl: "website/website-new.view.client.html"
            })
            .when("/website/:wid", {
                templateUrl: "website/website-edit.view.client.html"
            })
            .when("/page", {
                templateUrl: "page-list.html"
            })
            .when("/page/new", {
                templateUrl: "page-new.html"
            })
            .when("/page/:pid", {
                templateUrl: "page-edit.html"
            })

            .otherwise({redirectTo: "/login"});
    }
})();