/**
 * Created by shraddha on 10/16/16.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http)
    {
        var idGenerator = 1500;
        console.log(idGenerator);


        var api =
        {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget

        };
        return api;

        function createWidget(pageId, widget)
        {
            var url = "/api/user/:uid/website/:wid/page/"+pageId+"/widget";
            return $http.post(url, widget);

        }

        function findWidgetsByPageId(pageId)
        {
            var url = "/api/user/:uid/website/:wid/page/"+pageId.toString()+"/widget";

            return $http.get(url);


        }

        function findWidgetById(widgetId)
        {
            var url = "/api/user/:uid/website/:wid/page/:pid/widget/"+widgetId;
            return $http.get(url);


        }

        function updateWidget(widgetId, widget)
        {
            var url = "/api/user/:uid/website/:wid/page/:pid/widget/"+widgetId;
            return $http.put(url, widget);

        }

        function deleteWidget(widgetId)
        {
            var url = "/api/user/:uid/website/:wid/page/:pid/widget/"+widgetId;
            return $http.delete(url, widgetId);


        }


    }



})();