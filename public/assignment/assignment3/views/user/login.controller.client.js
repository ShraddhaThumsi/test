/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    function LoginController($scope) {
        $scope.hello = "hello from login controller";
        console.log($scope.hello);
    }
})();