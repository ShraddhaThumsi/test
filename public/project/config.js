/**
 * Created by shraddha on 11/9/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .config(Config);

    function Config($routeProvider){
        $routeProvider
            .when("", {})
            .when("", {})
            .when("", {})
            .when("", {})
            .when("", {})
            .when("", {})
            .when("", {})
            .when("", {})
            .when("", {})

            .otherwise({redirectTo: "/login"});
    }
})();