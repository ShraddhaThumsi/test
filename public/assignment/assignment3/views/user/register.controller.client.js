/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope) {
        $scope.hello = "hello from register controller";
        console.log($scope.hello);
    }
})();