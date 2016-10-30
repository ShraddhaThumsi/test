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

            var url = "/api/user/" + uid + "/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId){


            var url = "/api/user/:uid/website/" + websiteId;
            return $http.get(url);
        }

        function createWebsite(userId, website)
        {   var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);


        }

        function updateWebsite(websiteId, website)
        {
            console.log("website to be updated");
            console.log(website);
            var url = "/api/user/:uid/website/"+websiteId;
            return $http.put(url, website);
            /*
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
            return website;*/
        }

        function deleteWebsite(websiteId)
        {
            var url = "/api/user/:uid/website/"+websiteId;
            return $http.delete(url);
            /*var i;
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
            return false;*/
        }


    }
})();
