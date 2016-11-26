/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app, model)
{
    var pages = [
        { _id: "321", name: "Post 1", wid: 456},
        { _id: "432", name: "Post 2", wid: 456},
        { _id: "543", name: "Post 3", wid: 456}
    ];
    app.post("/api/user/:uid/website/:wid/page", createPage);
    app.get("/api/user/:uid/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/user/:uid/website/:wid/page/:pid", findPageById);
    app.put("/api/user/:uid/website/:wid/page/:pid", updatePage);
    app.delete("/api/user/:uid/website/:wid/page/:pid", deletePage);

    function createPage(req, res)
    {
        var page = req.body;

        model
            .pageModel
            .createPage(req.params.wid, req.body)
            .then(function(newPage){
                res.json(newPage);
            }, function(error){
                res.sendStatus(400).send(error);
            })
        /*page._id = (new Date()).getTime();
        pages.push(page);
        res.send(page);*/
    }

    function updatePage(req, res)
    {
        var page = req.body;
        var pageId = req.params['pid'];
        model
            .pageModel
            .updatePage(pageId, page)
            .then(function(status){
                res.send(status);
            }, function(error){
                res.sendStatus(400).send(error);
            })
        /*for(var p in pages)
        {
            if(pages[p]._id == pageId)
            {
                pages[p].name = page.name;
                pages[p].title = page.title;
            }
        }
        res.sendStatus(200);*/
    }

    function deletePage(req, res)
    {
        var pageId = req.params['pid'];
        model
            .pageModel
            .deletePage(pageId)
            .then(function(status){
                res.send(status);
            }, function(error){
                res.sendStatus(400).send(error);
            })
        /*for(var p in pages)
        {
            if(pages[p]._id == pageId)
            {
                pages.splice(p, 1);
            }
        }
        res.sendStatus(200);*/
    }

    function findAllPagesForWebsite(req, res)
    {
        var websiteId = req.params.wid;
        model
            .pageModel
            .findAllPagesForWebsite(req.params.wid)
            .then(function(pages){

                    res.json(pages)

            }, function(error){
                res.sendStatus(400).send(error);
            });
        /*for (var p in pages)
        {
            if(parseInt(pages[p].wid) === websiteId)
            {
                pagesToReturn.push(pages[p]);
            }
        }
        res.send(pagesToReturn);*/
    }

    function findPageById(req, res)
    {

        var pageId = req.params.pid;
        model
            .pageModel
            .findPageById(pageId)
            .then(function(page){
                if(page)
                {
                    res.send(page);
                }
                else
                {
                    res.send('0');
                }
            }, function(error){
                res.sendStatus(400).send(error);
            })

        /*for (var p in pages)
        {
            if(pages[p]._id == pageId)
            {
                res.send(pages[p]);
                return;
            }
        }*/
        /*res.send('0');*/
    }
}