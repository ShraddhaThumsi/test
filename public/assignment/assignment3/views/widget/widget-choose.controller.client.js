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
        vm.chooseWidget = chooseWidget;
        function chooseWidget()
        {
            /*var widget = {};
            var newWidget = WidgetService.createWidget(pageId, widget);
            if(newWidget)
            {
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget");
            }

            else
            {
                vm.error = "Unable to create widget";
            }*/

            vm.createHeaderWidget = createHeaderWidget;
            function createHeaderWidget()
            {
                var widget = {"_id": 0, "widgetType": "HEADER", "pageId": pageId, "size": 0, "text": " "};
                var newHeaderWidget = WidgetService.createWidget(pageId, widget);
                vm.newHeaderWidget = newHeaderWidget;
                if(newHeaderWidget)
                {
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHeaderWidget._id);
                }
            }


            vm.createHtmlWidget = createHtmlWidget;
            function createHtmlWidget()
            {
                var widget = {"_id": 0, "widgetType": "HTML", "pageId": pageId, "text": " "};
                var newHeaderWidget = WidgetService.createWidget(pageId, widget);
                vm.newHeaderWidget = newHeaderWidget;
                if(newHeaderWidget)
                {
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHeaderWidget._id);
                }
            }


            vm.createImageWidget = createImageWidget;
            function createImageWidget()
            {
                var widget = {"_id": 0, "widgetType": "IMAGE", "pageId": pageId, "width": 0, "url": " "};
                var newHeaderWidget = WidgetService.createWidget(pageId, widget);
                vm.newHeaderWidget = newHeaderWidget;
                if(newHeaderWidget)
                {
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHeaderWidget._id);
                }
            }


            vm.createYoutubeWidget = createYoutubeWidget;
            function createYoutubeWidget()
            {
                var widget = {"_id": 0, "widgetType": "YOUTUBE", "pageId": pageId, "width": 0, "url": " "};
                var newHeaderWidget = WidgetService.createWidget(pageId, widget);
                vm.newHeaderWidget = newHeaderWidget;
                if(newHeaderWidget)
                {
                    $location.url("/user/" + vm.userId + "/website/" +
                        vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHeaderWidget._id);
                }
            }

        }

    }
})();