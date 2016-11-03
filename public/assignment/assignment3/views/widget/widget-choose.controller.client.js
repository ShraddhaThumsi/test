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
            /*var promise = WidgetService.createWidget(pageId, widget);*/
            var newHeaderWidget = WidgetService.createWidget(pageId, widget);

            if(newHeaderWidget)
            {
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHeaderWidget._id);
            }

            /*promise
                .success(function headerWidget(newHeaderWidget)
                {
                    if(newHeaderWidget)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHeaderWidget._id);
                    }})
                .error(function(aaa)
                {
                    console.log(aaa);
                })*/

        }


        vm.createHtmlWidget = createHtmlWidget;
        function createHtmlWidget()
        {
            var widget = {"_id": 0, "widgetType": "HTML", "pageId": pageId, "text": " "};
            /*var promise = WidgetService.createWidget(pageId, widget);*/
            var newHtmlWidget = WidgetService.createWidget(pageId, widget);
            if(newHtmlWidget)
            {
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHtmlWidget._id);
            }

            /*promise
                .success(function newHtmlWidget(newHtmlWidget){
                    if(newHtmlWidget)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHtmlWidget._id);
                    }
                })
                .error(function(aaa)
                {
                    console.log(aaa);
                })*/

        }


        vm.createImageWidget = createImageWidget;
        function createImageWidget()
        {
            var widget = {"_id": 0, "widgetType": "IMAGE", "pageId": pageId, "width": 0, "url": " "};
            /*var promise = WidgetService.createWidget(pageId, widget);*/
            var newImageWidget = WidgetService.createWidget(pageId, widget);
            if(newImageWidget)
            {
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + newImageWidget._id);
            }

            /*promise
                .success(function newImageWidget(newImageWidget)
                {
                    if(newImageWidget)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newImageWidget._id);
                    }
                })
                .error(function(aaa){
                    console.log(aaa);
                });*/

        }


        vm.createYoutubeWidget = createYoutubeWidget;
        function createYoutubeWidget()
        {
            var widget = {"_id": 0, "widgetType": "YOUTUBE", "pageId": pageId, "width": 0, "url": " "};
            /*var promise = WidgetService.createWidget(pageId, widget);*/
            var newYoutubeWidget = WidgetService.createWidget(pageId, widget);
            if(newYoutubeWidget)
            {
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + newYoutubeWidget._id);
            }

            /*promise
                .success(function newYoutubeWidget(newYoutubeWidget){
                    if(newYoutubeWidget)
                    {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newYoutubeWidget._id);
                    }
                })
                .error(function(aaa){
                    console.log(aaa);
                });*/

        }



    }
})();