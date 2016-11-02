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


        }


    }
})();