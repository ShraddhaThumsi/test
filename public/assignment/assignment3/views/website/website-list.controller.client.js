/**
 * Created by shraddha on 10/16/16.
 */
/*
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    function WebsiteListController($scope) {
        console.log("hello from website list controller");
        var websites = [
            {   "_id": 123,
                "name": "Facebook",
                "description": "most popular social networking"},
            {   "_id": 234,
                "name": "Wikipedia",
                "description": "world's encyclopedia"}
        ];

        $scope.websites = websites;
    }
})();*/

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService)
    {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.websites = WebsiteService.findWebsitesByUser(userId);

    }
})();
