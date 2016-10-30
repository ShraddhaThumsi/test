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

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        /*var currentPage = PageService.findPageById(userId, websiteId, pageId);
        vm.currentPage = currentPage;
        vm.name = currentPage.name;
        vm.wid = currentPage.wid;*/


        function updatePage(pageId, name, title)
        {
            var promise = PageService.updatePage(pageId, {name: vm.name, title: vm.title});
            promise
                .success(function page(page){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function errorHandler(aaa){
                    console.log(aaa);
                })

           /* vm.name = name.toString();
            vm.title = title;
            var updatedPage = PageService.updatePage(pageId, {name: vm.name, wid: vm.websiteId});
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");*/
        }


        function deletePage(pageId)
        {
            var promise = PageService.deletePage(vm.pageId);
            promise
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function(){

                });
            /*console.log(pageId);
            var result = PageService.deletePage(pageId);
            console.log(result);
            if(result)
            {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else
            {
                vm.error = "Unable to delete page";
            }*/

        }


    }
})();