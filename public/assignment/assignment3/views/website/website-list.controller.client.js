/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    function WebsiteListController($scope) {
        console.log("hello from website list controller");
        var websites = [
            {"name": "Facebook",
            "description": "most popular social networking"},
            {"name": "Wikipedia", "description": "world's encyclopedia"}
        ];

        $scope.websites = websites;
    }
})();