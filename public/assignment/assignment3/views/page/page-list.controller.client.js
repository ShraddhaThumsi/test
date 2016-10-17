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


    }
})();