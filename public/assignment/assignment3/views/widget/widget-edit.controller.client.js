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
        vm.currentWidget = currentWidget;
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        vm.widgets = widgets;
        vm.updateWidget = updateWidget;
        function updateWidget(widgetId, widget)
        {
            switch(widget.widgetType)
            {
                case "HEADER":
                    var updatedWidget = WidgetService.updateWidget(widgetId, {size: widget.size, text: widget.text});
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                    break;
                case "HTML":var updatedWidget = WidgetService.updateWidget(widgetId, {text: widget.text});
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                    break;
                case "YOUTUBE":var updatedWidget =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                    break;
                case "IMAGE":var updatedWidget =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                    break;
                default: vm.error = "Unknown widget type";
            }
            /*var updatedWidget = WidgetService.updateWidget(widgetId, {});
            $location.url("/user/" + vm.userId + "/website/" +
                vm.websiteId + "/page/" + vm.pageId + "/widget");*/
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