/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService)
    {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.goToPageList = goToPageList;
        vm.userId = userId;

        function init(){
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise
                .success(function website(websites){
                    if(websites)
                    {

                        vm.websites = websites;
                        console.log(websites);
                    }

                })
                .error(function errorHandler(aaa){
                    console.log(aaa);
                });

        }
        init();

        function goToPageList(website)
        {
            console.log(website);
            console.log("/user/" + userId + "/website/" + website._id + "/page");
            $location.url("/user/" + userId + "/website/" + website._id + "/page");
        }




    }
})();