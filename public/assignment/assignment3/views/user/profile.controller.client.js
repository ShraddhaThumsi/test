/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope) {
        $scope.hello = "hello from profile controller";
        console.log($scope.hello);
    }
})();