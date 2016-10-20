/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetYouTubeController", WidgetYouTubeController);
    function WidgetYouTubeController($location, $routeParams, WidgetService)
    {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var pageId = parseInt($routeParams['pid']);
        vm.pageId = pageId;
        var widgetId = parseInt($routeParams['wgid']);
        vm.widgetId = widgetId;
    }
})();