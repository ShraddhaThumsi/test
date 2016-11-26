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
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        vm.createPage = createPage;
        function createPage(name, description)
        {

            var page = {name: vm.name, title: vm.title}
            var promise = PageService.createPage(userId, websiteId, page);
            promise
                .success(function page(newPage){

                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");

                })
                .error(function(aaa){
                console.log(aaa);
                });

        }
    }
})();