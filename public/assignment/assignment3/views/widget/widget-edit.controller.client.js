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
        //var widgets = WidgetService.findWidgetsByPageId(pageId);
        //vm.widgets = widgets;
        vm.updateWidget = updateWidget;

        function updateWidget(widgetId, widget)
        {

            console.log(widgetId);
            console.log(widget);
            console.log(widget.widgetType.toString() == "HEADER");
            console.log(widget.widgetType.toString() == "HTML");
            console.log(widget.widgetType.toString() == "IMAGE");
            console.log(widget.widgetType.toString() == "YOUTUBE");
            if(widget.widgetType.toString() == "HEADER")
            {
                //var updatedWidget = WidgetService.updateWidget(widgetId, {size: widget.size, text: widget.text});
                var updatedWidget = WidgetService.updateWidget(widgetId, widget);
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }

            else if(widget.widgetType.toString() == "HTML")
            {
                var updatedWidget = WidgetService.updateWidget(widgetId, {text: widget.text});
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
            }

            else if(widget.widgetType.toString() == "YOUTUBE")
            {
                console.log(widget.widgetType);
                var updatedWidget =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
            }

            else if(widget.widgetType.toString() == "IMAGE")
            {
                var updatedWidget =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
            }


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