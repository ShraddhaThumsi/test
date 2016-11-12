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





        function updatePage(userId, websiteId, pageId, name, title)
        {
            console.log(userId + " userId");
            console.log(websiteId + " websiteId");
            console.log(pageId + " pageId");
            console.log(name + " page name");
            console.log(title + " page title");

            var promise = PageService.updatePage(userId, websiteId, pageId, {name: name, title: title});
            promise
                .success(function page(page){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function errorHandler(aaa){
                    console.log(aaa);
                })


        }


        function deletePage(userId, websiteId, pageId)
        {
            var promise = PageService.deletePage(userId, websiteId, vm.pageId);
            promise
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function(){

                });


        }

        function init()
        {

            var promise = PageService.findPageById(userId, websiteId, pageId);
            promise
                .success(function page(page){
                    if(page)
                    {
                        vm.page = page;
                        console.log("found page");
                    }
                })
                .error(function(aaa){
                    console.log(aaa);
                });
        }
        init();



    }
})();