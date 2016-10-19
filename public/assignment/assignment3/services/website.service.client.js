/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var idGenerator = 900;
        console.log(idGenerator);
        var websites = [
            { _id: "123", name: "Facebook",    uid: "456", description: "most popular social networking website" },
            { _id: "234", name: "Twitter",     uid: "456", description: "the favourite blog site for celebs" },
            { _id: "456", name: "Gizmodo",     uid: "456", description: "all things technical" },
            { _id: "567", name: "Tic Tac Toe", uid: "123", description: "the classic old x's and o's" },
            { _id: "678", name: "Checkers",    uid: "123", description: "mind game" },
            { _id: "789", name: "Chess",       uid: "234", description: "mind game" }
        ];

       /* [
            { _id: "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];*/
       // check if this is the correct data format




        /*[
         {name: 'facebook.com', uid: 123},
         {name: 'twitter.com', uid: 234},
         {name: 'wikipedia.org', uid: 123}
         ];*/
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

            /*console.log("website id:" + idGenerator);*/
            websites.push(newWebSite);
            console.log("website id:" + newWebSite._id);
            console.log("updated list of websites: " + websites);
            return newWebSite;
        }

        function updateWebsite(websiteId, newWebsite)
        {
            var website;
            for (var w in websites) {
                website = websites[w];
                if (parseInt(website._id) === websiteId) {
                    website.name = newWebsite.name;
                    website.uid = newWebsite.uid;
                    website.description = newWebsite.description;
                    console.log(website);
                    return website;
                }
            }
            return website;
            /*var currentWebsite;
            for (var w in websites)
            {
                currentWebsite = websites[w];
                if(parseInt(currentWebsite._id) === websiteId)
                {
                    currentWebsite.name = website.name;
                    currentWebsite.uid = website.uid;
                    currentWebsite.description = website.description;
                    console.log(currentWebsite);
                    return currentWebsite;
                }
            }
            return currentWebsite;*/
        }

        function deleteWebsite(websiteId)
        {
            for(var w in websites)
            {
                if(parseInt(websites[w]._id) === websiteId)
                {
                   continue;
                }
                result.push(websites[w]);
            }
            console.log(result);
            return result;
        }


    }
})();
