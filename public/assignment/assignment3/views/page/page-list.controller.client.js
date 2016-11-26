/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService, $location)
    {
        var vm = this;
        var websiteId = $routeParams['wid'];
        var userId = $routeParams['uid'];
        /*var pages = PageService.findPageByWebsiteId(websiteId);*/
        var promise = PageService.findPageByWebsiteId(userId, websiteId);
        promise
            .success(function pages(website){
                if(website.pages != '0')
                {
                    vm.pages = website.pages;

                    console.log(website.pages);
                    var userId = $routeParams['uid'];
                    vm.websiteId = $routeParams['wid'];
                    vm.userId = userId;
                    vm.goToWidgetList = goToWidgetList;
                    function goToWidgetList(page)
                    {

                        $location.url("/user/" + userId.toString() + "/website/" + vm.websiteId + "/page/" +
                            page._id.toString() + "/widget");

                    }
                }
            })
            .error(function errorHandler(aaa){
                console.log(aaa);
            })

    }
})();