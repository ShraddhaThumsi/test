/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("editPageController", editPageController);

    function editPageController($routeParams, PageService, $location)
    {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;
        console.log("reporting from page edit controller, datatype of page id:" + typeof pageId);
        vm.updatePage = updatePage;
        var currentPage = PageService.findPageById(pageId);
        vm.currentPage = currentPage;
        vm.name = currentPage.name;
        vm.wid = currentPage.wid;
        console.log("reporting from page edit controller, this is the datatype of current page:");
        console.log(typeof vm.currentPage);
        console.log("reporting from page edit controller, datatype of page name: " + typeof vm.name);
        function updatePage(name, title)
        {
            vm.name = name.toString();
            vm.title = title;
            var updatedPage = PageService.updatePage(pageId, {name: vm.name, wid: vm.websiteId});
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }

        vm.deletePage = deletePage;
        function deletePage(pageId)
        {
            console.log(pageId);
            var result = PageService.deletePage(pageId);
            console.log(result);
            if(result)
            {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else
            {
                vm.error = "Unable to delete page";
            }

        }


    }
})();