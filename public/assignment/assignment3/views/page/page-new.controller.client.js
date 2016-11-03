/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("newPageController", newPageController);

    function newPageController($routeParams, $location, PageService)
    {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        vm.createPage = createPage;
        function createPage(name)
        {
            var page = {_id: "0", name: name, wid: websiteId};
            var promise = PageService.createPage(websiteId, page);
            promise
                .success(function page(newPage){
                    if(newPage)
                    {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    }
                })
                .error(function(aaa){
                console.log(aaa);
                });

        }
    }
})();