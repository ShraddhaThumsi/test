/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    function EditWidgetController($routeParams, $location, WidgetService, $window)
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


        vm.updateImageWidget = updateImageWidget;



        function updateImageWidget(widgetId, widget) {
            if($window.imgData) {
                widget.imageData = $window.imgData;
            }
            console.log(widget);

            if (!widget.url && !widget.imageData) {
                alert("No URL or Image uploaded");
            }
            else {
                var promise =
                    WidgetService.updateWidget(userId, websiteId, pageId, widgetId, widget);

                promise
                    .success(function updatedWidget(updatedWidget) {
                        if (updatedWidget) {
                            vm.widget = updatedWidget;
                            $location.url("/user/" + vm.userId + "/website/" +
                                vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function (aaa) {
                        console.log("reporting from widget choose controller, image widget could not be updated");
                        console.log(aaa);
                    });
            }
        }

        vm.updateWidget = updateWidget;



        function updateWidget(widgetId, widget) {


            if (widget.widgetType.toString() == "HEADER") {

                var promise = WidgetService.updateWidget(userId, websiteId, pageId, widgetId, widget);
                promise
                    .success(function updatedWidget(updatedWidget) {
                        if (updatedWidget) {
                            vm.widget = updatedWidget;
                            $location.url("/user/" + vm.userId + "/website/" +
                                vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function (aaa) {
                        console.log("reporting from widget choose controller, header widget could not be updated");
                        console.log(aaa);
                    })


            }

            else if (widget.widgetType.toString() == "HTML") {

                var promise = WidgetService.updateWidget(userId, websiteId, pageId, widgetId, {text: widget.text});
                promise
                    .success(function updatedWidget(updatedWidget) {
                        if (updatedWidget) {
                            vm.widget = updatedWidget;
                            $location.url("/user/" + vm.userId + "/website/" +
                                vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function (aaa) {
                        console.log("reporting from widget choose controller, html widget could not be updated")
                        console.log(aaa);
                    })

            }

            else if (widget.widgetType.toString() == "YOUTUBE") {

                var promise =
                    WidgetService.updateWidget(userId, websiteId, pageId, widgetId, {
                        width: widget.width,
                        url: widget.url
                    });

                promise
                    .success(function updatedWidget(updatedWidget) {
                        if (updatedWidget) {
                            vm.widget = updatedWidget;
                            $location.url("/user/" + vm.userId + "/website/" +
                                vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function (aaa) {
                        console.log("reporting from widget choose controller, youtube widget could not be updated");
                        console.log(aaa);
                    });
            }

            else if (widget.widgetType.toString() == "IMAGE") {
                console.log(widget);
                if (!widget.url && !widget.imageData) {
                    alert("No URL or Image uploaded");
                }
                else {
                    var promise =
                        WidgetService.updateWidget(userId, websiteId, pageId, widgetId, widget);

                    promise
                        .success(function updatedWidget(updatedWidget) {
                            if (updatedWidget) {
                                vm.widget = updatedWidget;
                                $location.url("/user/" + vm.userId + "/website/" +
                                    vm.websiteId + "/page/" + vm.pageId + "/widget");
                            }
                        })
                        .error(function (aaa) {
                            console.log("reporting from widget choose controller, image widget could not be updated");
                            console.log(aaa);
                        });
                }

            }


        }

        vm.deleteWidget = deleteWidget;
        function deleteWidget(widgetId)
        {

            var promise = WidgetService.deleteWidget(userId, websiteId, pageId, widgetId);

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

            var promise = WidgetService.findWidgetById(userId, websiteId, pageId, widgetId);
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