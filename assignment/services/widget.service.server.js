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

    var tmpWidgets = [];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../public/assignment/assignment3/views/widget/upload'});
    app.post("/api/user/:uid/website/:wid/page/:pid/widget", createWidget);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", findWidgetById);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", updateWidget);
    app.delete("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
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
        for(var wg in widgets)
        {
            if(widgets[wg]._id == widgetId)
            {
                widgets[wg].url = '/../public/assignment/assignment3/views/widget/upload'+filename;
                res.send(widgets[wg]);
            }
        }
        for(var wg in tmpWidgets)
        {
            if(tmpWidgets[wg]._id == widgetId)
            {
                var toupdate = tmpWidgets[wg];
                toupdate.url = '/../public/assignment/assignment3/views/widget/upload'+filename;
                tmpWidgets = [];
                tmpWidgets.push(toupdate)
                console.log(tmpWidgets);
                res.send(toupdate);
            }
        }
        //var url = "/assignment/assignment3/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
        //res.redirect(url);
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
                _id: (new Date()).getTime().toString(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                size: newWidget.size,
                text: newWidget.text,
                isNew: true
            };
            tmpWidgets.push(newWidget);


            res.send(newWidget);
        }

        if(newWidget.widgetType.toString() == "IMAGE")
        {
            var newWidget = {
                _id: (new Date()).getTime().toString(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                width: newWidget.width,
                text: newWidget.text,
                url: newWidget.url,
                imageData:null,
                isNew: true
            };
            tmpWidgets.push(newWidget);


            res.send(newWidget);
        }

        if(newWidget.widgetType.toString() == "YOUTUBE")
        {
            var newWidget = {
                _id: (new Date()).getTime().toString(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                width: newWidget.width,
                text: newWidget.text,
                isNew: true
            };
            tmpWidgets.push(newWidget);


            res.send(newWidget);
        }

        if(newWidget.widgetType.toString() == "HTML")
        {
            var newWidget = {
                _id: (new Date()).getTime().toString(),
                widgetType: newWidget.widgetType,
                pageId: newWidget.pageId,
                text: newWidget.text,
                isNew: true
            };
            tmpWidgets.push(newWidget);


            res.send(newWidget);
        }
    }



    function findWidgetsByPageId(req, res)
    {

        var pageId = parseInt(req.params.pid);
        var result = [];
        for(var wg in widgets)
        {
            if(parseInt(widgets[wg].pageId) === pageId)
            {
                result.push(widgets[wg]);

            }
        }

        res.send(result);
    }

    function findWidgetById(req, res)
    {
        var widgetId = parseInt(req.params['wgid']);


        for(var wg in widgets)
        {
            if(parseInt(widgets[wg]._id) === widgetId)
            {

                console.log("reporting from widget server service, this is the widget found for the given ID");
                console.log(widgets[wg]);
                res.send(widgets[wg]);
            }
        }
        for(var wg in tmpWidgets)
        {
            if(parseInt(tmpWidgets[wg]._id) === widgetId)
            {

                console.log("reporting from widget server service, this is the widget found for the given ID");
                console.log(tmpWidgets[wg]);
                res.send(tmpWidgets[wg]);
            }
        }

    }


    function updateWidget(req, res)
    {
        var widget = req.body;
        if(widget.isNew) {
            widget.isNew = false;
            widgets.push(widget)
        } else {
            var widgetId = req.params['wgid'];
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

        for(var w in widgets)
        {
            if(widgets[w]._id == widgetId)
            {
                widgets.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }
}