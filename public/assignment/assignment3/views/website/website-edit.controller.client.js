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
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        vm.updateWebsite = updateWebsite;
        var currentWebsite = WebsiteService.findWebsiteById(websiteId);
        vm.currentWebsite = currentWebsite;
        vm.name = currentWebsite.name;
        vm.description = currentWebsite.description;
        console.log(vm.currentWebsite);
        console.log(vm.name);
        console.log(vm.description);
        function updateWebsite(websiteId, website)
        {
            var updatedWebsite = WebsiteService.updateWebsite(websiteId, website);
            $location.url("/user/" + vm.userId + "/website/");
        }

        vm.deleteWebsite = deleteWebsite;
        function deleteWebsite(websiteId)
        {
            console.log(websiteId)
            var result = WebsiteService.deleteWebsite(websiteId);
            console.log(result)
            if(result)
            {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {vm.error = "Unable to delete website";}
        }

    }
})();