/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app, model){
    var websites = [
        { _id: "123", name: "Facebook",    uid: "456", description: "most popular social networking website"},
        { _id: "234", name: "Twitter",     uid: "456", description: "the favourite blog site for celebs"},
        { _id: "456", name: "Gizmodo",     uid: "456", description: "all things technical"},
        { _id: "567", name: "Tic Tac Toe", uid: "123", description: "the classic old x's and o's"},
        { _id: "678", name: "Checkers",    uid: "123", description: "mind game"},
        { _id: "789", name: "Chess",       uid: "234", description: "mind game"}
    ];
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/user/:uid/website/:wid", findWebsiteById);
    app.post("/api/user/:uid/website", createWebsite);
    app.put("/api/user/:uid/website/:wid", updateWebsite);
    app.delete("/api/user/:uid/website/:wid", deleteWebsite);

    function createWebsite(req,res)
    {
        var website = req.body;
        model
            .websiteModel
            .createWebsite(website)
            .then(function(newWebsite)
            {

                res.send(newWebsite);
            }, function(error){
                res.sendStatus(400).send(error);
            });
        /*website._id = (new Date()).getTime();
        websites.push(website);
        res.send(website);*/
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.uid;
        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(function(websites){
                if(websites)
                {
                    res.send(websites);
                }
                else
                {
                    res.send('0');
                }
            }, function(error){
                res.sendStatus(400).send(error);
            })
        /*var sitesForUser = new Array;
        websites.forEach(function(w){
            if(w.uid == userId){
                sitesForUser.push(w);
            }
        })

        res.send(sitesForUser);*/

    }

    function findWebsiteById(req, res){
        var websiteId = req.params.wid;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(function(website){
                if(website)
                {
                    res.send(website)
                }
                else
                {
                    res.send('0');
                }
            }, function(error){
                res.sendStatus(400).send(error);
            });
        /*for(var w in websites){
            if(parseInt(websites[w]._id) === websiteId)
            {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');*/
    }

    function updateWebsite(req, res)
    {
        var website = req.body;
        var websiteId = req.params['wid'];
        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(function(status){
                res.send(status);
            }, function(error){
                res.sendStatus(400).send(error);
            })
        /*for(var w in websites)
        {
            if(websites[w]._id == websiteId)
            {
                websites[w].name = website.name;
                websites[w].description = website.description;
            }
        }
        res.sendStatus(200);*/
    }

    function deleteWebsite(req, res)
    {
        var websiteId = req.params['wid'];
        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(function(status){
                res.send(200);
            }, function(error){
                res.sendStatus(400).send(error);
            });
        /*for(var w in websites)
        {
            if(websites[w]._id == websiteId)
            {
                websites.splice(w, 1);
            }
        }
        res.sendStatus(200);*/
    }

}