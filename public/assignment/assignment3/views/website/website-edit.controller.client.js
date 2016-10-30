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
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;



        function updateWebsite(websiteId, name, description)
        {
            var promise = WebsiteService.updateWebsite(websiteId, {name: vm.name, description: vm.description});
            promise
                .success(function website(website){
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function errorHandler(aaa)
                {
                    console.log(aaa);
                })

        }


        function deleteWebsite()
        {
            var promise = WebsiteService.deleteWebsite(vm.websiteId);
            promise
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function(){

                })

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