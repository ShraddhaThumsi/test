/**
 * Created by shraddha on 10/16/16.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService()
    {
        var idGenerator = 1500;
        console.log(idGenerator);
        var widgets =
            [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

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
            var widgetExists = false;
            /*for(var wg in widgets)
            {
                var existingWidget = widgets[wg];
            }*/

            var newWidget = {
                _id: (idGenerator + 1).toString(),
                widgetType: widget.widgetType,
                pageId: widget.pageId
            };
            widgets.push(newWidget);
            console.log("widget id:" + newWidget._id);
            console.log("updated list of widgets: " + widgets);
            return newWidget;
        }

        function findWidgetsByPageId(pageId)
        {
            var result = [];
            for(var wg in widgets)
            {
                if(parseInt(widgets[wg].pageId) === pageId)
                {
                    result.push(widgets[wg]);
                }
            }
            console.log(result);
            return result;
        }

        function findWidgetById(widgetId)
        {
            for(var wg in widgets)
            {
                if(parseInt(widgets[wg]._id) === widgetId)
                {
                    return widgets[wg];
                }
            }
            return false;

        }

        function updateWidget(widgetId, widget)
        {
            return null;

        }

        function deleteWidget(widgetId)
        {
            var i;
            var found = false;
            for(i in widgets)
            {
                if(widgets[i]._id.toString() === widgetId.toString())
                {
                    found = true;
                    break;

                }
            }

            if(found)
            {
                console.log(i);
                widgets.splice(i,1);
                return true;
            }
            return false;

        }


    }



})();