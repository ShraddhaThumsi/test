/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app, model)
{
    var widgets =
        [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<h1>Hello</h1>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    var tmpWidgets = [];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../public/assignment/assignment3/views/widget/upload'});
    app.post("/api/user/:uid/website/:wid/page/:pid/widget", createWidget);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", findWidgetById);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", updateWidget);
    app.delete("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", deleteWidget);
   // app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget", updateWidgetPosition);


    function updateWidgetPosition(req, res)
    {
        var start = req.query.start;
        var stop = req.query.stop;
        widgets.splice(stop, 0, widgets.splice(start, 1)[0]);
        res.send(widgets);
        console.log([start, stop]);
    }

    function uploadImage(req, res) {
        console.log("hello");
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var width = req.body.width;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        model
            .widgetModel
            .createWidget(pageId, myFile)
            .then(function(newWidget){
                res.send(newWidget);
            }, function(error){
                res.sendStatus(400).send(error);
            })
        /*for(var wg in widgets)
        {
            if(widgets[wg]._id == widgetId)
            {
                widgets[wg].url = '/../public/assignment/assignment3/views/widget/upload'+filename;
                break;
            }
        }*/
        /*for(var wg in tmpWidgets)
        {
            if(tmpWidgets[wg]._id == widgetId)
            {
                tmpWidgets[wg].url = '/../public/assignment/assignment3/views/widget/upload'+filename;
                break;
            }
        }*/
        //var url = "/assignment/assignment3/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
        console.log(req.body);
        console.log("above is the request body");
        console.log("hello");
        /*res.redirect("/assignment/assignment3/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");*/
        res.redirect(req.referrer);
        console.log(req.referrer);
        console.log("above is the request referrer");
        /*widgets.push(myFile);
        console.log("widget list after pushing uploaded image");
        res.send(widgets);*/
    }

    function createWidget(req,res)
    {
        var newWidget = req.body;
        tmpWidgets = [];
        if(newWidget.widgetType.toString() == "HEADER")
        {
            var newWidget = {

                widgetType: newWidget.widgetType,
                _page: newWidget._page,
                size: newWidget.size,
                text: newWidget.text
                //isNew: true
            };
            model
                .widgetModel
                .createWidget(req.params.uid, newWidget)
                .then(function(newWidget){
                    res.send(newWidget);
                }, function(error){
                    res.sendStatus(400).send(error);
                })

        }

        if(newWidget.widgetType.toString() == "IMAGE")
        {
            var newWidget = {

                widgetType: newWidget.widgetType,
                _page: newWidget._page,
                width: newWidget.width,
                text: newWidget.text,
                url: newWidget.url
            };
            model
                .widgetModel
                .createWidget(req.params.uid, newWidget)
                .then(function(newWidget){
                    res.send(newWidget);
                }, function(error){
                    res.sendStatus(400).send(error);
                })



        }

        if(newWidget.widgetType.toString() == "YOUTUBE")
        {
            var newWidget = {
                _id: (new Date()).getTime().toString(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                width: newWidget.width,
                text: newWidget.text
            };
            model
                .widgetModel
                .createWidget(req.params.uid, newWidget)
                .then(function(newWidget){
                    res.send(newWidget);
                }, function(error){
                    res.sendStatus(400).send(error);
                })



        }

        if(newWidget.widgetType.toString() == "HTML")
        {
            var newWidget = {
                _id: (new Date()).getTime().toString(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                text: newWidget.text};

            model
                .widgetModel
                .createWidget(req.params.uid, newWidget)
                .then(function(newWidget){
                    res.send(newWidget);
                }, function(error){
                    res.sendStatus(400).send(error);
                })
        }
    }



    function findWidgetsByPageId(req, res)
    {

        var pageId = req.body._page;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function(widgets){
                if(widgets)
                {
                    res.send(widgets);
                }

                else
                {
                    res.send('0');
                }
            }, function(error){
                res.sendStatus(400).send(error);
            })
        /*for(var wg in widgets)
        {
            if(widgets[wg].pageId== pageId)
            {
                result.push(widgets[wg]);

            }
        }

        res.send(result);*/
    }

    function findWidgetById(req, res)
    {
        var widgetId = req.params['wgid'];

        var pageId = req.body._page;

        model
            .widgetModel
            .findWidgetById(pageId, widgetId)
            .then(function(widget){
                if(widget)
                {
                    res.send(widget);
                }
                else
                {
                    res.send('0');
                }
            }, function(error){
                res.sendStatus(400).send(error);
            })

        /*for(var wg in widgets)
        {
            if(widgets[wg]._id == widgetId)
            {


                console.log("reporting from widget server service, this is the widget found for the given ID");
                console.log(widgets[wg]);
                res.send(widgets[wg]);
            }
        }*/


    }


    function updateWidget(req, res)
    {
        var widget = req.body;
        if(widget.isNew) {
            widget.isNew = false;
            widgets.push(widget)
        } else {
            var widgetId = req.params['wgid'];
            console.log(req.params['wgid']);
            for(var wg in widgets)
            {
                if(widgets[wg]._id == widgetId)
                {
                    widgets[wg] = widget;
                }

            }
        }

        res.sendStatus(200);
    }


    function deleteWidget(req, res)
    {
        var widgetId = req.params['wgid'];

        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(function(status)
            {
                res.send(200);
;            }, function(error){
                res.sendStatus(400).send(error);
            })
        /*for(var w in widgets)
        {

            if(widgets[w]._id == widgetId)
            {
                widgets.splice(w, 1);
            }
        }
        res.sendStatus(200);*/
    }
}