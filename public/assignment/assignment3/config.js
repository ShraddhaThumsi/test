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

            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"

            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/website/new", {
                templateUrl: "views/website/website-new.view.client.html"
            })
            .when("/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html"
            })
            .when("/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html"
            })
            .when("/page/new", {
                templateUrl: "views/page/page-new.view.client.html"
            })
            .when("/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html"
            })
            .otherwise({redirectTo: "/login"});
    }
})();