/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("editWebsiteController", editWebsiteController);
    function editWebsiteController($routeParams, WebsiteService, $location)
    {

        /*var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.userId = userId;
        var websiteId = parseInt($routeParams.wid);
        vm.websiteId = websiteId;
        var website = WebsiteService.findWebsiteById(websiteId);
        vm.updateWebsite = updateWebsite;
        var updatedWebsite;
        vm.updatedWebsite = updatedWebsite;
        function updateWebsite(websiteId, newWebsite){
            updatedWebsite = WebsiteService.updateWebsite(websiteId, newWebsite);

            $location.url("/user/" + userId + "/website");}*/

        /*function deleteWebsite(websiteId)
        {var deletedUser = UserService.deleteUser(userId);
            console.log(deletedUser);
        }*/

        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
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
        
    }
})();