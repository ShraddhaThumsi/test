/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app){
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

    function createWebsite(req,res)
    {
        var website = req.body;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.send(website);
    }

    function findAllWebsitesForUser(req, res){
        var userId = parseInt(req.params.uid);
        for (var w in websites){
            if(parseInt(websites[w].uid) === userId)
            {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }

    function findWebsiteById(req, res){
        var websiteId = parseInt(req.params.wid);
        for(var w in websites){
            if(parseInt(websites[w]._id) === websiteId)
            {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }

}