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
        // var currentWebsite = WebsiteService.findWebsiteById(websiteId);
        // vm.currentWebsite = currentWebsite;
        /*vm.name = currentWebsite.name;
        vm.description = currentWebsite.description;*/
        /*console.log("reporting from website edit controller, this is the datatype of current website:");
        console.log(typeof vm.currentWebsite);*/
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;



        vm.updateWebsite = updateWebsite;
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


            /*var promise = WebsiteService.updateWebsite(currentWebsite);
            promise
                .success(function website(website){
                    if(website){
                    $location.url("/user/"+vm.userId+"/website");}
                })
                .error(function(){

                })
            $location.url("/user/"+vm.userId+"/website");
*/
            /*vm.name = name;
            vm.description = description;
            var updatedWebsite = WebsiteService.updateWebsite(websiteId, {name: name, description: description});
            $location.url("/user/" + vm.userId + "/website/");*/
        }

        vm.deleteWebsite = deleteWebsite;
        function deleteWebsite()
        {
            var promise = WebsiteService.deleteWebsite(vm.websiteId);
            promise
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function(){

                })
            /*console.log(websiteId);
            var result = WebsiteService.deleteWebsite(websiteId);
            console.log(result);
            if(result)
            {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {vm.error = "Unable to delete website";}*/
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