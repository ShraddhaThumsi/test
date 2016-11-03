/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app)
{
    var widgets =
        [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<h3><span class="mw-headline" ' +
            'id="Sale_of_headquarters_and_relocation_to_Jersey_City">' +
            'Sale of headquarters and relocation to Jersey City</span><span class="mw-editsection">' +
            '<span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=Forbes&amp;action=edit&amp;' +
            'section=2" title="Edit section: Sale of headquarters and relocation to Jersey City">edit</a><span ' +
            'class="mw-editsection-bracket">]</span></span></h3>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    app.post("/api/user/:uid/website/:wid/page/:pid/widget", createWidget);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", findWidgetById);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", updateWidget);
    app.delete("/api/user/:uid/website/:wid/page/:pid/widget/:wid", deleteWidget);

    function createWidget(req,res)
    {
        var newWidget = req.body;
        if(newWidget.widgetType.toString() == "HEADER")
        {
            var newWidget = {
                _id: (new Date()).getTime(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                size: newWidget.size,
                text: newWidget.text
            };
            widgets.push(newWidget);
            console.log("widget id:" + newWidget._id);
            console.log("updated list of widgets: " + widgets);
            console.log(newWidget);
            console.log("HEADER created");
            console.log(widgets);
            /*res.sendStatus(newWidget);*/
            res.send(newWidget);
        }

        if(newWidget.widgetType.toString() == "IMAGE")
        {
            var newWidget = {
                _id: (new Date()).getTime(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                width: newWidget.width,
                text: newWidget.text
            };
            widgets.push(newWidget);
            console.log(newWidget);
            console.log("IMAGE created")
            console.log(widgets);
            /*res.sendStatus(newWidget);*/
            res.send(newWidget);
        }

        if(newWidget.widgetType.toString() == "YOUTUBE")
        {
            var newWidget = {
                _id: (new Date()).getTime(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                width: newWidget.width,
                text: newWidget.text
            };
            widgets.push(newWidget);
            console.log("YOUTUBE created")
            console.log(newWidget);
            console.log(widgets);
            /*res.sendStatus(newWidget);*/
            /*res.sendStatus(200);*/
            res.send(newWidget);
        }

        if(newWidget.widgetType.toString() == "HTML")
        {
            var newWidget = {
                _id: (new Date()).getTime(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                text: newWidget.text
            };
            widgets.push(newWidget);
            console.log("HTML created");
            console.log(newWidget);
            console.log(widgets);
            /*res.sendStatus(newWidget);*/
            /*res.sendStatus(200);*/
            res.send(newWidget);
        }
    }



    function findWidgetsByPageId(req, res)
    {
        console.log(req.params);
        console.log(typeof req.params.pid);
        console.log("above is the datatype of the pid parameter of the incoming request, check how to extract pageId");
        var pageId = parseInt(req.params.pid);
        var result = [];
        for(var wg in widgets)
        {
            if(parseInt(widgets[wg].pageId) === pageId)
            {
                result.push(widgets[wg]);
                console.log("reporting from widget server service, " +
                    "this is the status of the list of widgets for the given pageId");
                console.log(result);
            }
        }
        /*res.sendStatus(result);*/
        /*res.sendStatus(200);*/
        res.send(result);
    }

    function findWidgetById(req, res)
    {
        var widgetId = req.params.wgid;
        for(var wg in widgets)
        {
            if(widgets[wg]._id == widgetId)
            {
                /*res.sendStatus(widgets[wg]);*/
                /*res.sendStatus(200);*/
                console.log("reporting from widget server service, this is the widget found for the given ID");
                console.log(widgets[wg]);
                res.send(widgets[wg]);
            }
        }

    }


    function updateWidget(req, res)
    {
        var widget = req.body;
        var pageId = req.params['pid'];
        if(widget.widgetType.toString() == "HEADER")
        {
            var newWidget = {
                _id: widget._id,
                widgetType: widget.widgetType,
                pageId: widget.pageId,
                size: widget.size,
                text: widget.text
            };
            res.sendStatus(200);

        }

        if(widget.widgetType.toString() == "HTML")
        {
            var newWidget = {
                _id: widget._id,
                widgetType: widget.widgetType,
                pageId: widget.pageId,
                text: widget.text
            };
            res.sendStatus(200);

        }

        if(widget.widgetType.toString() == "IMAGE")
        {
            var newWidget = {
                _id: widget._id,
                widgetType: widget.widgetType,
                pageId: widget.pageId,
                width: widget.width,
                text: widget.text
            };
            res.sendStatus(200);

        }

        if(widget.widgetType.toString() == "YOUTUBE")
        {
            var newWidget = {
                _id: widget._id,
                widgetType: widget.widgetType,
                pageId: widget.pageId,
                width: widget.width,
                text: widget.text
            };
            res.sendStatus(200);

        }
    }


    function deleteWidget(req, res)
    {
        var widgetId = req.params['wgid'];
        for(var w in widgets)
        {
            if(widgets[w]._id == widgetId)
            {
                widgets.splice(w, 1);
            }
        }
        res.send(200);
    }
}