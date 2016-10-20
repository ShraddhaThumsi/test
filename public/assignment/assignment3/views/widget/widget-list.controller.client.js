/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $location){
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var pageId = parseInt($routeParams['pid']);
        vm.pageId = pageId;
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        vm.widgets = widgets;
        console.log(vm.widgets);

    }
})();