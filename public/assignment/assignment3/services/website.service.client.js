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


        var api ={
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;
        function findWebsitesByUser(uid){
            /*var result = [];
            for(var w in websites)
            {
                if(parseInt(websites[w].uid) === uid)
                {
                    result.push(websites[w]);
                }
            }
            console.log(result);
            return result;
            /!*$http.get("/website");*!/*/
            var url = "/api/user/" + uid + "/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId){
            /*for(var w in websites)
            {
                if(parseInt(websites[w]._id) === websiteId)
                {
                    return websites[w];
                }
            }
            return false;*/

            var url = "/api/user/:uid/website/" + websiteId;
            return $http.get(url);
        }

        function createWebsite(userId, website)
        {   var url = "/api/user/"+userId+"/website"
            return $http.post(url, website);

            /*
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
            return newWebSite;*/
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
