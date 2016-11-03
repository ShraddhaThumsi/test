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
                var promise = WidgetService.updateWidget(widgetId, widget);
                promise
                    .success(function updatedWidget(updatedWidget){
                        if(updatedWidget)
                        {
                            $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function(aaa){
                        console.log(aaa);
                    })


            }

            else if(widget.widgetType.toString() == "HTML")
            {
                var promise = WidgetService.updateWidget(widgetId, {text: widget.text});
                promise
                    .success(function updatedWidget(updatedWidget){
                        if(updatedWidget)
                        {
                            $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function(aaa){
                        console.log(aaa);
                    })

            }

            else if(widget.widgetType.toString() == "YOUTUBE")
            {
                console.log(widget.widgetType);
                var promise =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});

                promise
                    .success(function updatedWidget(updatedWidget){
                        if(updatedWidget)
                        {
                            $location.url("/user/" + vm.userId + "/website/" +
                                vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function(aaa)
                    {
                        console.log(aaa);
                    });
            }

            else if(widget.widgetType.toString() == "IMAGE")
            {
                var promise =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});

                promise
                    .success(function updatedWidget(updatedWidget)
                    {
                        if(updatedWidget)
                        {
                            $location.url("/user/" + vm.userId + "/website/" +
                                vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function(aaa)
                    {
                        console.log(aaa);
                    });
            }
        }

        vm.deleteWidget = deleteWidget;
        function deleteWidget(widgetId)
        {
            console.log("deleting widget no. : " + widgetId);
            var promise = WidgetService.deleteWidget(widgetId);
            console.log(result);
            promise
                .success(function result(result){
                    if(result)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                })
                .error(function(aaa){
                    console.log(aaa);
                })
        }
    }
})();