/**
 * Created by shraddha on 10/16/16.
 */

/*
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService)
    {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.goToPageList = goToPageList;
        vm.userId = userId;

        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        console.log(vm.websites);

        function goToPageList(website) {
            var currentWebsite;
            vm.website = website;
            vm.website._id = website._id;
            for(var w in websites)
            {
                currentWebsite = websites[w];
                if(currentWebsite._id === website._id)
                {
                    console.log(website);
                    console.log("/user/" + userId + "/website/" + website._id + "/page");
                    $location.url("/user/" + userId.toString() + "/website/" + website._id.toString() + "/page");
                }
            }



        }


    }
})();
*/


(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService)
    {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.goToPageList = goToPageList;
        vm.userId = userId;

        vm.websites = WebsiteService.findWebsitesByUser(userId);
        console.log(vm.websites);

        function goToPageList(website) {
            console.log(website);
            console.log("/user/" + userId + "/website/" + website._id + "/page");
            $location.url("/user/" + userId.toString() + "/website/" + website._id.toString() + "/page");
        }


    }
})();