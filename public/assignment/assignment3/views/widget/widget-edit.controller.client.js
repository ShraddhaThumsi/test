/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    function EditWidgetController($routeParams, $location, WidgetService)
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
        var currentWidget = WidgetService.findWidgetById(widgetId);
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        vm.widgets = widgets;
        vm.updateWidget = updateWidget;
        function updateWidget(widgetId, widget)
        {
            var updatedWidget = WidgetService.updateWidget(widgetId, {});
            $location.url("/user/" + vm.userId + "/website/" +
                vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        vm.deleteWidget = deleteWidget;
        function deleteWidget(widgetId)
        {
            console.log("deleting widget no. : " + widgetId);
            var result = WidgetService.deleteWidget(widgetId);
            console.log(result);
            if(result)
            {
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget");
            }

            else
            {
                vm.error = "Unable to delete widget";
            }
        }
    }
})();