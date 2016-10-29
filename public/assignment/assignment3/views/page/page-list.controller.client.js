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
        var websiteId = parseInt($routeParams['wid']);
        /*var pages = PageService.findPageByWebsiteId(websiteId);*/
        var promise = PageService.findPageByWebsiteId(websiteId);
        promise
            .success(function pages(pages){
                if(pages != '0')
                {
                    vm.pages = pages;
                    console.log(pages);
                    var userId = parseInt($routeParams['uid']);
                    vm.websiteId = websiteId;
                    vm.userId = userId;
                    vm.pages = pages;
                    vm.goToWidgetList = goToWidgetList;
                    function goToWidgetList(page)
                    {
                        console.log(page);
                        console.log("/user/" + userId + "/website/" + websiteId + "/page/" + page._id + "/widget");
                        $location.url("/user/" + userId.toString() + "/website/" + websiteId.toString() + "/page/" +
                            page._id.toString() + "/widget");

                    }
                }
            })
            .error(function errorHandler(aaa){
                console.log(aaa);
            })

    }
})();