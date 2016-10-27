/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService($http) {
        var idGenerator = 900;
        console.log(idGenerator);
        var websites = [
            { _id: "123", name: "Facebook",    uid: "456", description: "most popular social networking website"},
            { _id: "234", name: "Twitter",     uid: "456", description: "the favourite blog site for celebs"},
            { _id: "456", name: "Gizmodo",     uid: "456", description: "all things technical"},
            { _id: "567", name: "Tic Tac Toe", uid: "123", description: "the classic old x's and o's"},
            { _id: "678", name: "Checkers",    uid: "123", description: "mind game"},
            { _id: "789", name: "Chess",       uid: "234", description: "mind game"}
        ];

        var api ={
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;
        function findWebsitesByUser(uid){
            var result = [];
            for(var w in websites)
            {
                if(parseInt(websites[w].uid) === uid)
                {
                    result.push(websites[w]);
                }
            }
            console.log(result);
            return result;
            /*$http.get("/website");*/
        }

        function findWebsiteById(websiteId){
            for(var w in websites)
            {
                if(parseInt(websites[w]._id) === websiteId)
                {
                    return websites[w];
                }
            }
            return false;
        }

        function createWebsite(userId, website)
        {
            var websiteExists = false;
            for(var w in websites)
            {
                var existingWebsite = websites[w];
                if(existingWebsite.name === website.name)
                {
                    websiteExists = true;
                    return null;
                }
            }

            var newWebSite = {
                _id: (idGenerator + 1).toString(),
                name: website.name,
                uid: userId,
                description: website.description
            };

            websites.push(newWebSite);
            console.log("website id:" + newWebSite._id);
            console.log("updated list of websites: " + websites);
            return newWebSite;
        }

        function updateWebsite(websiteId, newWebsite)
        {
            console.log(websiteId);
            console.log(newWebsite);
            var website;
            for (var w in websites) {
                website = websites[w];
                if (website._id.toString() === websiteId.toString()) {
                    website.name = newWebsite.name;
                    website.description = newWebsite.description;
                    console.log(websites);
                    return website;
                }
            }
            return website;
        }

        function deleteWebsite(websiteId)
        {
            var i;
            var found = false;
            for(i in websites)
            {
                console.log(typeof websites[i]._id)
                console.log(typeof websiteId)
                if(websites[i]._id.toString() === websiteId.toString())
                {
                    console.log(websites);
                    found = true;
                    break;
                }
            }
            if (found) {
                console.log(i)
                websites.splice(i, 1);
                return true;
            }
            return false;
        }


    }
})();
