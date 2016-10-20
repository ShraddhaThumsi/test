/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("editWebsiteController", editWebsiteController);
    function editWebsiteController($routeParams, WebsiteService, $location)
    {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var currentWebsite = WebsiteService.findWebsiteById(websiteId);
        vm.currentWebsite = currentWebsite;
        vm.name = currentWebsite.name;
        vm.description = currentWebsite.description;
        console.log(vm.currentWebsite);
        console.log(vm.name);
        console.log(vm.description);
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        vm.updateWebsite = updateWebsite;
        function updateWebsite(name, description)
        {
            vm.name = name;
            vm.description = description;
            var updatedWebsite = WebsiteService.updateWebsite(websiteId, {name: name, description: description});
            $location.url("/user/" + vm.userId + "/website/");
        }

        vm.deleteWebsite = deleteWebsite;
        function deleteWebsite(websiteId)
        {
            console.log(websiteId);
            var result = WebsiteService.deleteWebsite(websiteId);
            console.log(result);
            if(result)
            {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {vm.error = "Unable to delete website";}
        }

        vm.goToPageList = goToPageList;
        function goToPageList(website)
        {
            console.log(website);
            console.log("/user/" + userId + "/website/" + website._id + "/page");
            $location.url("/user/" + userId.toString() + "/website/" + website._id.toString() + "/page");
        }

    }
})();