/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService)
    {
        var vm = this;
        var websiteId = parseInt($routeParams['wid']);
        var pages = PageService.findPageByWebsiteId(websiteId);
        /*if(pages != null){
         vm.pages = pages;
         console.log("found list of pages");
         }*/
        vm.pages = pages;


        // Check why this is wrong, but this is what you will have to do. You will need both website and user Ids
        /*var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websites = WebsiteService.findWebsitesByUser(userId);
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var pages;
        for(var w in websites)
        {
                pages = PageService.findPageByWebsiteId(w._id);

        }

        if(pages != null)
        {
            vm.pages = pages;
            console.log("found list of pages for given website");
        }
        else {
            vm.pages = pages;
            alert("No pages found for given website");}*/



    }
})();