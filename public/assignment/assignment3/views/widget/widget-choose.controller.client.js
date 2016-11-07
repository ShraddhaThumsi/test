/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService)
    {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var pageId = parseInt($routeParams['pid']);
        vm.pageId = pageId;

        console.log(pageId)

        vm.createHeaderWidget = createHeaderWidget;
        function createHeaderWidget()
        {
            var widget = {"_id": 0, "widgetType": "HEADER", "pageId": pageId, "size": 2, "text": " "};
            var promise = WidgetService.createWidget(userId, websiteId, pageId, widget);

            promise
                .success(function headerWidget(newHeaderWidget)
                {
                    if(newHeaderWidget)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHeaderWidget._id);
                    }})
                .error(function(aaa)
                {
                    console.log("reporting from widget choose controller, header widget could not be created");
                    console.log(aaa);
                })

        }


        vm.createHtmlWidget = createHtmlWidget;
        function createHtmlWidget()
        {
            var widget = {"_id": 0, "widgetType": "HTML", "pageId": pageId, "text": " "};
            var promise = WidgetService.createWidget(userId, websiteId, pageId, widget);


            promise
                .success(function newHtmlWidget(newHtmlWidget){
                    if(newHtmlWidget)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHtmlWidget._id);
                    }
                })
                .error(function(aaa)
                {
                    console.log("reporting from widget choose controller, html widget could not be created");
                    console.log(aaa);
                })

        }


        vm.createImageWidget = createImageWidget;
        function createImageWidget()
        {
            var widget = {"_id": 0, "widgetType": "IMAGE", "pageId": pageId, "width": 100, "url": null, "imageData": ""};
            vm.widget = widget;
            var promise = WidgetService.createWidget(vm.userId, vm.websiteId, vm.pageId, vm.widget);

            console.log(widget);
            promise
                .success(function newImageWidget(newImageWidget)
                {
                    if(newImageWidget)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newImageWidget._id);
                    }
                })
                .error(function(aaa){
                    console.log("reporting from widget choose controller, image widget could not be created");
                    console.log(aaa);
                });

        }


        vm.createYoutubeWidget = createYoutubeWidget;
        function createYoutubeWidget()
        {
            var widget = {"_id": 0, "widgetType": "YOUTUBE", "pageId": pageId, "width": 100, "url": "https://www.youtube.com/watch?v=o032WQMzUcI"};
            var promise = WidgetService.createWidget(userId, websiteId, pageId, widget);

            promise
                .success(function newYoutubeWidget(newYoutubeWidget){
                    if(newYoutubeWidget)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newYoutubeWidget._id);
                    }
                })
                .error(function(aaa){
                    console.log("reporting from widget choose controller, youtube widget could not be created");
                    console.log(aaa);
                });

        }



    }
})();