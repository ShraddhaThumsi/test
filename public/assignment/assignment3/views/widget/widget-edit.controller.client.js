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
        /*var currentWidget = WidgetService.findWidgetById(widgetId);
        vm.currentWidget = currentWidget;*/

        vm.updateWidget = updateWidget;



        function updateWidget(widgetId, widget)
        {


            /*console.log(widgetId);
            console.log(widget);
            console.log(widget.widgetType.toString() == "HEADER");
            console.log(widget.widgetType.toString() == "HTML");
            console.log(widget.widgetType.toString() == "IMAGE");
            console.log(widget.widgetType.toString() == "YOUTUBE");*/


            if(widget.widgetType.toString() == "HEADER")
            {
                /*var updatedWidget = WidgetService.updateWidget(widgetId, widget);
                if(updatedWidget)
                {
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                }*/
                var promise = WidgetService.updateWidget(widgetId, widget);
                promise
                    .success(function updatedWidget(updatedWidget){
                        if(updatedWidget)
                        {
                            $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
                        }
                    })
                    .error(function(aaa){
                        console.log("reporting from widget choose controller, header widget could not be updated");
                        console.log(aaa);
                    })


            }

            else if(widget.widgetType.toString() == "HTML")
            {
                /*var updatedWidget = WidgetService.updateWidget(widgetId, {text: widget.text});
                if(updatedWidget)
                {
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                }*/
                var promise = WidgetService.updateWidget(widgetId, {text: widget.text});
                promise
                    .success(function updatedWidget(updatedWidget){
                        if(updatedWidget)
                        {
                            $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
                        }
                    })
                    .error(function(aaa){
                        console.log("reporting from widget choose controller, html widget could not be updated")
                        console.log(aaa);
                    })

            }

            else if(widget.widgetType.toString() == "YOUTUBE")
            {
                /*var updatedWidget = WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});
                if(updatedWidget)
                {
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                }*/
                console.log(widget.widgetType);
                var promise =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});

                promise
                    .success(function updatedWidget(updatedWidget){
                        if(updatedWidget)
                        {
                            $location.url("/user/" + vm.userId + "/website/" +
                                vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
                        }
                    })
                    .error(function(aaa)
                    {
                        console.log("reporting from widget choose controller, youtube widget could not be updated")
                        console.log(aaa);
                    });
            }

            else if(widget.widgetType.toString() == "IMAGE")
            {
                /*var updatedWidget = WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});
                if(updatedWidget)
                {
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                }*/
                var promise =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url:widget.url});

                promise
                    .success(function updatedWidget(updatedWidget)
                    {
                        if(updatedWidget)
                        {
                            $location.url("/user/" + vm.userId + "/website/" +
                                vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
                        }
                    })
                    .error(function(aaa)
                    {
                        console.log("reporting from widget choose controller, image widget could not be updated");
                        console.log(aaa);
                    });
            }


        }




        vm.deleteWidget = deleteWidget;
        function deleteWidget(widgetId)
        {
            /*var result = WidgetService.deleteWidget(widgetId);
            if(result)
            {
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget");
            }*/
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
                    console.log("reporting from widget choose controller, widget could not be deleted");
                    console.log(aaa);
                })
        }

        function init()
        {
            var promise = WidgetService.findWidgetById(widgetId);
            promise
                .success(function widget(widget){
                    if(widget)
                    {
                        vm.widget = widget;
                        console.log("found widget");
                    }
                })
                .error(function errorHandler(aaa)
                {
                    console.log(aaa);
                })
        }
        init();
    }
})();