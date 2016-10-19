/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);

    function newWebsiteController($location, $routeParams, WebsiteService)
    {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        vm.createWebsite = createWebsite;
        function createWebsite(name, description){
            console.log(vm.name);
            console.log(vm.description);
            var website = {_id:"0", name: name, uid: userId, description: description};
            var newWebsite = WebsiteService.createWebsite(userId, website);
            if(newWebsite)
            {
                $location.url("/user/" + vm.userId+"/website");
            }
            else
            {
                vm.error = "Unable to create website";
            }
        }
    }
})();
